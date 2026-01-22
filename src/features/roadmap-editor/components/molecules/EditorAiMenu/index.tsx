'use client';

import { memo } from 'react';

import { Settings, Sparkles, WandSparkles } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { ToolbarButton } from '../../atoms/ToolbarButton';

export const EditorAiMenu = memo(function EditorAiMenu() {
  // TODO: Phase 4 - Implement actual AI roadmap generation
  const handleGenerateRoadmap = () => {
    // eslint-disable-next-line no-console
    console.log('AI 로드맵 생성 요청됨');
  };

  // TODO: Phase 4 - Implement actual AI roadmap modification
  const handleModifyRoadmap = () => {
    // eslint-disable-next-line no-console
    console.log('AI 로드맵 수정 요청됨');
  };

  return (
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
  );
});
