import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '에디터',
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
