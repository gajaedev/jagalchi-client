'use client';

import { Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useAIDialog } from '@/features/editor/hooks';

interface AIDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialAction?: 'generate' | 'modify';
  onGenerate?: (prompt: string, action: 'generate' | 'modify') => Promise<void>;
}

export function AIDialog({
  isOpen,
  onOpenChange,
  initialAction = 'generate',
  onGenerate,
}: AIDialogProps) {
  const {
    activeTab,
    setActiveTab,
    prompt,
    setPrompt,
    handleGenerate,
    getSectionTitle,
    getDescription,
    getPlaceholder,
    getButtonText,
    isButtonDisabled,
  } = useAIDialog({ initialAction, onGenerate });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-5" />
            AI 로드맵 생성
          </DialogTitle>
          <DialogDescription>
            AI를 활용하여 새로운 로드맵을 생성하거나 기존 로드맵을 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'generate' | 'modify')}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">로드맵 생성</TabsTrigger>
            <TabsTrigger value="modify">로드맵 수정</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">{getSectionTitle()}</h3>
              <p className="text-muted-foreground text-sm">{getDescription()}</p>
            </div>

            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={getPlaceholder()}
              className="min-h-[200px] resize-none"
            />

            <div className="flex justify-end">
              <Button onClick={handleGenerate} disabled={isButtonDisabled} className="gap-2">
                <Sparkles className="size-4" />
                {getButtonText()}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="modify" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">{getSectionTitle()}</h3>
              <p className="text-muted-foreground text-sm">{getDescription()}</p>
            </div>

            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={getPlaceholder()}
              className="min-h-[200px] resize-none"
            />

            <div className="flex justify-end">
              <Button onClick={handleGenerate} disabled={isButtonDisabled} className="gap-2">
                <Sparkles className="size-4" />
                {getButtonText()}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
