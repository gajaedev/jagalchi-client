'use client';

import { useState } from 'react';

import { Lock, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ResourceInput } from '@/features/editor/components/atoms/ResourceInput';
import type { Resource } from '@/features/editor/types/editor.types';

export function NodeSidebar() {
  const [title, setTitle] = useState('Node_1');
  const [description, setDescription] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [color, setColor] = useState('#3B82F6');
  const [colorText, setColorText] = useState('#3B82F6');
  const [isLocked, setLocked] = useState(false);

  const handleColorTextChange = (value: string) => {
    setColorText(value);
    // Only update color if it's a valid hex color
    if (/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value)) {
      setColor(value);
    }
  };

  const handleAddResource = () => {
    setResources([...resources, { id: crypto.randomUUID(), url: '', title: '' }]);
  };

  const handleRemoveResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleResourceUrlChange = (index: number, url: string) => {
    const newResources = [...resources];
    newResources[index] = { ...newResources[index], url };
    setResources(newResources);
  };

  const handleResourceTitleChange = (index: number, title: string) => {
    const newResources = [...resources];
    newResources[index] = { ...newResources[index], title };
    setResources(newResources);
  };

  return (
    <div className="border-border bg-card fixed top-0 right-0 z-50 h-full w-80 border-l shadow-lg">
      <ScrollArea className="h-full">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <h2 className="text-lg font-semibold">{title || '노드 편집'}</h2>
              <p className="text-muted-foreground text-sm">Node</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setLocked(!isLocked)}>
              <Lock className="size-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-6 p-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="node-title" className="text-sm font-medium">
                노드 이름
              </Label>
              <Input
                id="node-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="노드 이름 입력"
                className="h-10"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="node-description" className="text-sm font-medium">
                노드 설명
              </Label>
              <Textarea
                id="node-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="노드 설명 입력"
                className="min-h-[100px] resize-y"
              />
              <Button variant="outline" className="w-full text-sm">
                AI 생성
              </Button>
            </div>

            <Separator />

            {/* Color - TODO: Phase 2 머지 후 새 ColorPicker로 교체 */}
            <div className="space-y-2">
              <Label htmlFor="node-color" className="text-sm font-medium">
                기본 컬러
              </Label>
              <div className="flex gap-2">
                <Input
                  id="node-color"
                  type="color"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    setColorText(e.target.value);
                  }}
                  className="h-10 w-20 cursor-pointer"
                />
                <Input
                  type="text"
                  value={colorText}
                  onChange={(e) => handleColorTextChange(e.target.value)}
                  placeholder="#3B82F6"
                  className="h-10 flex-1 font-mono text-sm"
                />
              </div>
            </div>

            <Separator />

            {/* Resources */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">첨부 자료</Label>
              {resources.length > 0 ? (
                <div className="space-y-2">
                  {resources.map((resource, index) => (
                    <ResourceInput
                      key={resource.id}
                      url={resource.url}
                      title={resource.title}
                      onUrlChange={(url) => handleResourceUrlChange(index, url)}
                      onTitleChange={(title) => handleResourceTitleChange(index, title)}
                      onRemove={() => handleRemoveResource(index)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">첨부된 자료가 없습니다</p>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddResource}
                className="w-full gap-2"
              >
                <Plus className="size-4" />
                자료 추가
              </Button>
              <Button variant="outline" size="sm" className="w-full text-sm">
                AI 추천
              </Button>
            </div>

            <Separator />

            {/* Lock Toggle */}
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center gap-2">
                <Lock className="text-muted-foreground size-4" />
                <div>
                  <Label htmlFor="node-lock" className="text-sm font-medium">
                    잠금
                  </Label>
                  <p className="text-muted-foreground text-xs">노드를 잠가 수정을 방지합니다</p>
                </div>
              </div>
              <Switch id="node-lock" checked={isLocked} onCheckedChange={setLocked} />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
