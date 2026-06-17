'use client';

import { useState } from 'react';

export default function ScanLine() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      onAnimationEnd={() => setVisible(false)}
      style={{
        position: 'fixed',
        left: 0,
        width: '100%',
        height: '1px',
        background:
          'linear-gradient(90deg, transparent 0%, var(--accent) 20%, #ffffff40 50%, var(--accent) 80%, transparent 100%)',
        boxShadow: '0 0 8px var(--accent)',
        pointerEvents: 'none',
        zIndex: 100,
        animation: 'scanLineSweep 1200ms linear forwards',
      }}
    />
  );
}
