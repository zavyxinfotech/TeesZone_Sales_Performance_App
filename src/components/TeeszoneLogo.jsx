import React from 'react';

export const TeeszoneLogo = ({ className = "h-10 md:h-12 w-auto", showTagline = true }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Deep Burgundy 3D Emblem */}
      <img
        src="/teeszone_icon.png"
        alt="TEESZONE"
        className="h-full w-auto object-contain flex-shrink-0"
        onError={(e) => {
          // Fallback to SVG if needed
          e.target.src = '/teeszone_logo.svg';
        }}
      />

      {/* Typography in Deep Burgundy */}
      <div className="flex flex-col justify-center">
        <span className="text-xl sm:text-2xl font-black tracking-tight text-[#4A0A17] leading-none drop-shadow-2xs">
          TEESZONE
        </span>
        {showTagline && (
          <span className="text-[8px] sm:text-[9.5px] font-black tracking-[0.18em] uppercase text-[#6E1B2D] mt-1 whitespace-nowrap leading-none">
            elevate your style with custom tees
          </span>
        )}
      </div>
    </div>
  );
};
