import React, { CSSProperties, PropsWithChildren } from 'react';

type GlowBorderProps = PropsWithChildren<{
  color?: string;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
  animated?: boolean;
}>;

const GlowBorder: React.FC<GlowBorderProps> = ({
  children,
  color = '#7df9ff',
  thickness = 2,
  className = '',
  style = {},
  animated = true
}) => {
  return (
    <div 
      className={`relative ${className}`}
      style={style}
    >
      {/* Borde con gradiente animado */}
      <div 
        className={`absolute inset-0 rounded-lg overflow-hidden pointer-events-none`}
        style={{
          padding: thickness,
        }}
      >
        {/* Gradiente rotatorio */}
        <div 
          className={`absolute inset-0 rounded-lg ${animated ? 'animate-spin-slow' : ''}`}
          style={{
            background: `conic-gradient(
              from 0deg,
              transparent 0deg,
              ${color} 90deg,
              transparent 180deg,
              ${color} 270deg,
              transparent 360deg
            )`,
            opacity: 0.6,
          }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-lg blur-sm"
          style={{
            background: `linear-gradient(45deg, ${color}40, transparent, ${color}40)`,
            opacity: 0.8,
          }}
        />
      </div>

      {/* Contenido */}
      <div className="relative bg-black rounded-lg">
        {children}
      </div>

      {/* Animación CSS */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default GlowBorder;