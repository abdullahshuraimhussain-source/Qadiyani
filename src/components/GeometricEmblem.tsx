import React from 'react';

interface GeometricEmblemProps {
  className?: string;
  size?: number;
}

export const GeometricEmblem: React.FC<GeometricEmblemProps> = ({
  className = 'w-10 h-10',
  size = 40,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Luxury Prestige Diamond / Rhombus Outer Seal */}
      <div
        className="w-full h-full bg-[var(--accent-olive)] flex items-center justify-center shadow-xs transition-transform duration-500 hover:rotate-90"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      >
        {/* Inner geometric star cut / subtle core */}
        <div
          className="w-[58%] h-[58%] bg-[var(--bg-main)] flex items-center justify-center transition-colors duration-400"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        >
          <div
            className="w-[45%] h-[45%] bg-[var(--accent-olive)]"
            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
          />
        </div>
      </div>
    </div>
  );
};

