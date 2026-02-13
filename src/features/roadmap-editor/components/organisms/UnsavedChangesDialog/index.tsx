import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface UnsavedChangesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onDiscard: () => void;
}

export function UnsavedChangesDialog({
  isOpen,
  onClose,
  onSave,
  onDiscard,
}: UnsavedChangesDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>저장하지 않은 변경사항이 있습니다</DialogTitle>
          <DialogDescription>
            로드맵에 저장하지 않은 변경사항이 있습니다. 저장하지 않고 나가시겠습니까?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose}>
            계속 편집
          </Button>
          <Button variant="outline" onClick={onDiscard}>
            저장하지 않고 나가기
          </Button>
          <Button onClick={onSave}>저장하고 나가기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
