import { useMemo, useState } from 'react';

import { ChevronRight, FileText, Folder, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type FileNode = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  author?: string;
  children?: FileNode[];
};

const MOCK_FILE_TREE: FileNode[] = [
  {
    id: '1',
    name: 'CS 기초',
    type: 'folder',
    children: [
      { id: '1-1', name: '운영체제 정복하기', type: 'file', author: '홍길동' },
      { id: '1-2', name: '알고리즘 코딩테스트', type: 'file', author: '김철수' },
      {
        id: '1-3',
        name: '자료구조 심화',
        type: 'folder',
        children: [{ id: '1-3-1', name: '트리와 그래프', type: 'file', author: '이영희' }],
      },
    ],
  },
  {
    id: '2',
    name: '프론트엔드',
    type: 'folder',
    children: [
      { id: '2-1', name: 'React 마스터 클래스', type: 'file', author: '박지성' },
      { id: '2-2', name: 'Next.js 14 완전 정복', type: 'file', author: '손흥민' },
    ],
  },
  { id: '3', name: '백엔드 개론', type: 'file', author: '류현진' },
];

type FileTreeItemProps = {
  node: FileNode;
  depth?: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  initiallyOpen?: boolean;
};

function FileTreeItem({
  node,
  depth = 0,
  selectedId,
  onSelect,
  initiallyOpen = false,
}: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  if (node.type === 'folder') {
    return (
      <div className="text-[14px] select-none">
        <div
          className={cn(
            'hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1',
            depth > 0 && 'ml-4',
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronRight
            className={cn(
              'text-muted-foreground h-4 w-4 transition-transform',
              isOpen && 'rotate-90',
            )}
          />
          <Folder className="h-4 w-4 fill-sky-200 text-sky-500" />
          <span className="text-foreground font-semibold">{node.name}</span>
        </div>
        {isOpen && node.children && (
          <div className="flex flex-col">
            {node.children.map((child) => (
              <FileTreeItem
                key={child.id}
                node={child}
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                initiallyOpen={initiallyOpen}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isSelected = selectedId === node.id;

  return (
    <div
      className={cn(
        'group hover:bg-accent flex cursor-pointer items-center justify-between rounded-md px-2 py-1',
        depth > 0 && 'ml-8',
        isSelected && 'bg-indigo-50 ring-1 ring-indigo-500 hover:bg-indigo-50',
      )}
      onClick={() => onSelect(node.id)}
    >
      <div className="flex items-center gap-2">
        <FileText
          className={cn(
            'text-muted-foreground h-4 w-4',
            isSelected && 'fill-indigo-100 text-indigo-500',
          )}
        />
        <span
          className={cn(
            'text-foreground group-hover:text-foreground text-[14px]',
            isSelected && 'font-medium text-indigo-900',
          )}
        >
          {node.name}
        </span>
      </div>
      {node.author && (
        <span className={cn('text-muted-foreground text-[12px]', isSelected && 'text-indigo-400')}>
          By {node.author}
        </span>
      )}
    </div>
  );
}

export function AddRoadmapModal({
  children,
  onConfirm,
}: {
  children: React.ReactNode;
  onConfirm?: (fileId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_FILE_TREE;

    const filterNodes = (nodes: FileNode[]): FileNode[] => {
      const result: FileNode[] = [];

      nodes.forEach((node) => {
        if (node.type === 'file') {
          if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            result.push(node);
          }
        } else if (node.type === 'folder' && node.children) {
          const filteredChildren = filterNodes(node.children);

          // Only include folder if it has matching children
          if (filteredChildren.length > 0) {
            result.push({
              ...node,
              children: filteredChildren,
            });
          }
        }
      });

      return result;
    };

    return filterNodes(MOCK_FILE_TREE);
  }, [searchQuery]);

  const handleSelect = (id: string) => {
    setSelectedFileId((prev) => (prev === id ? null : id));
  };

  const handleConfirm = () => {
    if (selectedFileId) {
      onConfirm?.(selectedFileId);
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setSelectedFileId(null);
          setSearchQuery('');
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="flex h-[600px] w-[600px] flex-col gap-0 p-0 sm:max-w-[600px]"
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 border-b px-6 py-4">
          <DialogTitle className="text-lg font-bold">로드맵 선택</DialogTitle>
          <div className="relative w-[240px]">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="로드맵 검색"
              className="h-9 pl-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden p-6">
          <div className="border-border h-full overflow-y-auto rounded-lg border p-2">
            <div className="flex flex-col gap-0.5">
              {filteredTree.length > 0 ? (
                filteredTree.map((node) => (
                  <FileTreeItem
                    key={node.id}
                    node={node}
                    selectedId={selectedFileId}
                    onSelect={handleSelect}
                    initiallyOpen={searchQuery.length > 0}
                  />
                ))
              ) : (
                <div className="text-muted-foreground py-10 text-center text-sm">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 border-t p-4 sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              취소
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={!selectedFileId}
            onClick={handleConfirm}
          >
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
