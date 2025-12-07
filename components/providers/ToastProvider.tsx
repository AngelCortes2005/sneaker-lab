'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right"
      richColors
      theme="dark"
      toastOptions={{
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(125, 249, 255, 0.2)',
          color: 'white',
        },
      }}
    />
  );
}