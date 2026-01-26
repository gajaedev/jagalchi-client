'use client';

import { memo, useState } from 'react';

import { Settings, Sparkles, WandSparkles } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { ToolbarButton } from '../../atoms/ToolbarButton';
import { RoadmapAiModal } from '../../organisms/RoadmapAiModal';

export const EditorAiMenu = memo(function EditorAiMenu() {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalMode, setAiModalMode] = useState<'generate' | 'modify'>('generate');

  const handleGenerateRoadmap = () => {
    setAiModalMode('generate');
    setIsAiModalOpen(true);
  };

  const handleModifyRoadmap = () => {
    setAiModalMode('modify');
    setIsAiModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <ToolbarButton
              icon={<Settings className="h-5 w-5" />}
              label={EDITOR_MESSAGES.TOOLBAR_GEAR_TOOLTIP}
              isActive={false}
              onClick={() => {}}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="top" sideOffset={8}>
          <DropdownMenuItem onClick={handleGenerateRoadmap} className="cursor-pointer">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>{EDITOR_MESSAGES.AI_MENU_GENERATE_LABEL}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleModifyRoadmap} className="cursor-pointer">
            <WandSparkles className="mr-2 h-4 w-4" />
            <span>{EDITOR_MESSAGES.AI_MENU_MODIFY_LABEL}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RoadmapAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        mode={aiModalMode}
      />
    </>
  );
});
