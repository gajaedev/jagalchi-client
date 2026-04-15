'use client';

import { memo, useState } from 'react';

import { BookOpen, Lightbulb, MessageSquare, Target, TrendingUp } from 'lucide-react';

import { getLearningCoach, getRecordCoach } from '@/api/ai';
import type { RecordCoachResponse, LearningCoachResponse } from '@/api/ai';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { VIEWER_MESSAGES } from '@/constants/messages';

type TabType = 'feedback' | 'coach';

interface LearningCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  roadmapId: string;
  selectedNodeId?: string | null;
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const percent = Math.round(value * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-20 shrink-0 text-xs text-slate-500">{label}</span>
      <div className="h-2 flex-1 rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-xs font-medium">{percent}%</span>
    </div>
  );
}

function FeedbackTab({
  data,
  isLoading,
  onRequest,
}: {
  data: RecordCoachResponse | null;
  isLoading: boolean;
  onRequest: () => void;
}) {
  if (!data && !isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <BookOpen className="h-10 w-10 text-slate-300" />
        <p className="text-muted-foreground text-sm">{VIEWER_MESSAGES.COACH_FEEDBACK_EMPTY}</p>
        <Button onClick={onRequest} size="sm">
          {VIEWER_MESSAGES.COACH_FEEDBACK_REQUEST}
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-muted-foreground text-sm">{VIEWER_MESSAGES.COACH_LOADING}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-4">
      {/* Scores */}
      <div className="space-y-2">
        <h4 className="flex items-center gap-1.5 text-sm font-semibold">
          <Target className="h-4 w-4" />
          {VIEWER_MESSAGES.COACH_SCORES}
        </h4>
        <div className="space-y-1.5">
          <ScoreBar
            label={VIEWER_MESSAGES.COACH_SCORE_EVIDENCE}
            value={data.scores.evidence_level}
          />
          <ScoreBar
            label={VIEWER_MESSAGES.COACH_SCORE_STRUCTURE}
            value={data.scores.structure_score}
          />
          <ScoreBar
            label={VIEWER_MESSAGES.COACH_SCORE_SPECIFICITY}
            value={data.scores.specificity_score}
          />
          <ScoreBar
            label={VIEWER_MESSAGES.COACH_SCORE_REPRODUCIBILITY}
            value={data.scores.reproducibility_score}
          />
          <ScoreBar label={VIEWER_MESSAGES.COACH_SCORE_OVERALL} value={data.scores.quality_score} />
        </div>
      </div>

      <Separator />

      {/* Strengths */}
      {data.strengths.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-green-700">
            <TrendingUp className="h-4 w-4" />
            {VIEWER_MESSAGES.COACH_STRENGTHS}
          </h4>
          <ul className="space-y-1 pl-5">
            {data.strengths.map((s, i) => (
              <li key={i} className="list-disc text-sm text-slate-700">
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gaps */}
      {data.gaps.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="flex items-center gap-1.5 text-sm font-semibold text-amber-700">
            <Lightbulb className="h-4 w-4" />
            {VIEWER_MESSAGES.COACH_GAPS}
          </h4>
          <ul className="space-y-1 pl-5">
            {data.gaps.map((g, i) => (
              <li key={i} className="list-disc text-sm text-slate-700">
                {g}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Actions */}
      {data.next_actions.length > 0 && (
        <div className="space-y-1.5">
          <h4 className="text-sm font-semibold">{VIEWER_MESSAGES.COACH_NEXT_ACTIONS}</h4>
          <ul className="space-y-1 pl-5">
            {data.next_actions.map((a, i) => (
              <li key={i} className="list-disc text-sm text-slate-700">
                {typeof a === 'string' ? a : JSON.stringify(a)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CoachTab({
  data,
  isLoading,
  question,
  onQuestionChange,
  onAsk,
}: {
  data: LearningCoachResponse | null;
  isLoading: boolean;
  question: string;
  onQuestionChange: (v: string) => void;
  onAsk: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder={VIEWER_MESSAGES.COACH_QUESTION_PLACEHOLDER}
          className="text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading && question.trim()) onAsk();
          }}
        />
        <Button onClick={onAsk} disabled={isLoading || !question.trim()} size="sm">
          {VIEWER_MESSAGES.COACH_ASK}
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground text-sm">{VIEWER_MESSAGES.COACH_LOADING}</p>
        </div>
      )}

      {data && !isLoading && (
        <div className="space-y-3">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="mb-1 text-xs font-medium text-slate-400">Q: {data.question}</p>
            <p className="text-sm whitespace-pre-wrap text-slate-800">{data.answer}</p>
          </div>

          {data.retrieval_evidence.length > 0 && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400">{VIEWER_MESSAGES.COACH_SOURCES}</p>
              {data.retrieval_evidence.map((e, i) => (
                <p key={i} className="truncate text-xs text-blue-600">
                  {e.snippet}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {!data && !isLoading && (
        <div className="flex flex-col items-center gap-2 py-8">
          <MessageSquare className="h-8 w-8 text-slate-300" />
          <p className="text-muted-foreground text-sm">{VIEWER_MESSAGES.COACH_QA_EMPTY}</p>
        </div>
      )}
    </div>
  );
}

export const LearningCoachModal = memo(function LearningCoachModal({
  isOpen,
  onClose,
  roadmapId,
  selectedNodeId,
}: LearningCoachModalProps) {
  const [tab, setTab] = useState<TabType>('feedback');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [feedbackData, setFeedbackData] = useState<RecordCoachResponse | null>(null);
  const [coachData, setCoachData] = useState<LearningCoachResponse | null>(null);
  const [question, setQuestion] = useState('');

  const handleRequestFeedback = async () => {
    setIsLoading(true);
    try {
      const response = await getRecordCoach({
        roadmap_id: roadmapId,
        node_id: selectedNodeId ?? '',
        compose_level: 'quick',
      });
      setFeedbackData(response);
      setErrorMessage('');
    } catch {
      setErrorMessage(VIEWER_MESSAGES.COACH_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskCoach = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    try {
      const response = await getLearningCoach({
        question: question.trim(),
        compose_level: 'quick',
      });
      setCoachData(response);
      setErrorMessage('');
    } catch {
      setErrorMessage(VIEWER_MESSAGES.COACH_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setErrorMessage('');
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{VIEWER_MESSAGES.COACH_TITLE}</DialogTitle>
        </DialogHeader>

        {errorMessage && (
          <p className="text-destructive text-sm" role="alert">
            {errorMessage}
          </p>
        )}

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setTab('feedback')}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === 'feedback' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            {VIEWER_MESSAGES.COACH_TAB_FEEDBACK}
          </button>
          <button
            type="button"
            onClick={() => setTab('coach')}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === 'coach' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
            }`}
          >
            {VIEWER_MESSAGES.COACH_TAB_QA}
          </button>
        </div>

        <ScrollArea className="max-h-[400px]">
          {tab === 'feedback' ? (
            <FeedbackTab
              data={feedbackData}
              isLoading={isLoading}
              onRequest={handleRequestFeedback}
            />
          ) : (
            <CoachTab
              data={coachData}
              isLoading={isLoading}
              question={question}
              onQuestionChange={setQuestion}
              onAsk={handleAskCoach}
            />
          )}
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {VIEWER_MESSAGES.COACH_CLOSE}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
