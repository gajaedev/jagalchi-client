import { useState, useEffect } from 'react';

type AIAction = 'generate' | 'modify';

interface UseAIDialogParams {
  initialAction?: AIAction;
  onGenerate?: (prompt: string, action: AIAction) => Promise<void>;
}

export function useAIDialog({ initialAction = 'generate', onGenerate }: UseAIDialogParams) {
  const [activeTab, setActiveTab] = useState<AIAction>(initialAction);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // initialAction 변경 시 activeTab 동기화
  useEffect(() => {
    setActiveTab(initialAction);
  }, [initialAction]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      await onGenerate?.(prompt, activeTab);
      setPrompt(''); // 성공 후 프롬프트 초기화
    } finally {
      setIsGenerating(false);
    }
  };

  const getSectionTitle = () => {
    return activeTab === 'generate' ? '로드맵 정보' : '수정사항 정보';
  };

  const getDescription = () => {
    return activeTab === 'generate' ? '말이시' : '이번 부분을 이렇게 수정할거 생각하고싶습니다.';
  };

  const getPlaceholder = () => {
    return activeTab === 'generate' ? '어떤 로드맵을 생성할까요?' : '어떻게 수정할까요?';
  };

  const getButtonText = () => {
    if (isGenerating) return '생성중';
    return activeTab === 'generate' ? '생성하기' : '수정';
  };

  const isButtonDisabled = !prompt.trim() || isGenerating;

  return {
    activeTab,
    setActiveTab,
    prompt,
    setPrompt,
    isGenerating,
    handleGenerate,
    getSectionTitle,
    getDescription,
    getPlaceholder,
    getButtonText,
    isButtonDisabled,
  };
}
