'use client';

import React, { CSSProperties, PropsWithChildren, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GlowBorder from './GlowBorder';

// Lazy load ElectricBorder solo para desktop
const ElectricBorder = dynamic(() => import('./ElectricBorder'), {
  ssr: false,
  loading: () => <GlowBorder color="#7df9ff" />,
});

type ResponsiveBorderProps = PropsWithChildren<{
  color?: string;
  speed?: number;
  chaos?: number;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}>;

const ResponsiveBorder: React.FC<ResponsiveBorderProps> = ({
  children,
  color = '#7df9ff',
  speed = 1,
  chaos = 0.5,
  thickness = 2,
  className,
  style
}) => {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Evitar flash durante SSR
  if (!mounted) {
    return (
      <GlowBorder color={color} thickness={thickness} className={className} style={style}>
        {children}
      </GlowBorder>
    );
  }

  // Mobile: usar componente ligero
  if (isMobile) {
    return (
      <GlowBorder color={color} thickness={thickness} className={className} style={style}>
        {children}
      </GlowBorder>
    );
  }

  // Desktop: usar ElectricBorder completo
  return (
    <ElectricBorder
      color={color}
      speed={speed}
      chaos={chaos}
      thickness={thickness}
      className={className}
      style={style}
    >
      {children}
    </ElectricBorder>
  );
};

export default ResponsiveBorder;