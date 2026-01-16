'use client';

import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactFlowProvider>
      <div className="h-screen w-screen overflow-hidden">{children}</div>
    </ReactFlowProvider>
  );
}
