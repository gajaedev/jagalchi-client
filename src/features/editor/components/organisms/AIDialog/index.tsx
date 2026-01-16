'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { EDITOR_MESSAGES } from '@/constants/messages';

import type { AIAction } from '../../../types/editor.types';

interface AIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialAction?: AIAction;
}

export function AIDialog({ open, onOpenChange, initialAction = 'generate' }: AIDialogProps) {
  const [activeTab, setActiveTab] = useState<AIAction>(initialAction);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // TODO: API 호출 구현
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Generate roadmap with prompt
    } finally {
      setIsGenerating(false);
    }
  };

  const handleModify = async () => {
    setIsGenerating(true);
    try {
      // TODO: API 호출 구현
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Modify roadmap with prompt
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    if (activeTab === 'generate') {
      handleGenerate();
    } else {
      handleModify();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{EDITOR_MESSAGES.AI_DIALOG_TITLE}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AIAction)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">{EDITOR_MESSAGES.AI_DIALOG_GENERATE_TAB}</TabsTrigger>
            <TabsTrigger value="modify">{EDITOR_MESSAGES.AI_DIALOG_MODIFY_TAB}</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={EDITOR_MESSAGES.AI_DIALOG_GENERATE_PLACEHOLDER}
              className="min-h-[200px]"
              disabled={isGenerating}
            />
            <Button onClick={handleSubmit} disabled={isGenerating || !prompt.trim()}>
              {isGenerating
                ? EDITOR_MESSAGES.AI_DIALOG_GENERATING
                : EDITOR_MESSAGES.AI_DIALOG_GENERATE_BUTTON}
            </Button>
          </TabsContent>

          <TabsContent value="modify" className="space-y-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={EDITOR_MESSAGES.AI_DIALOG_MODIFY_PLACEHOLDER}
              className="min-h-[200px]"
              disabled={isGenerating}
            />
            <Button onClick={handleSubmit} disabled={isGenerating || !prompt.trim()}>
              {isGenerating
                ? EDITOR_MESSAGES.AI_DIALOG_GENERATING
                : EDITOR_MESSAGES.AI_DIALOG_MODIFY_BUTTON}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
