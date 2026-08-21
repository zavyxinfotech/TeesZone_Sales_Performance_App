import React from 'react';

export const TeeszoneLogo = ({ className = "h-8 sm:h-10 md:h-11 w-auto", showTagline = true }) => {
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 select-none ${className}`}>
      {/* Deep Burgundy 3D Emblem */}
      <img
        src="/teeszone_icon.png"
        alt="TEESZONE"
        className="h-full w-auto object-contain flex-shrink-0"
        onError={(e) => {
          e.target.src = '/teeszone_logo.svg';
        }}
      />

      {/* Typography in Deep Burgundy */}
      <div className="flex flex-col justify-center">
        <span className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-[#4A0A17] leading-none drop-shadow-2xs">
          TEESZONE
        </span>
        {showTagline && (
          <span className="text-[7px] sm:text-[8.5px] md:text-[9.5px] font-black tracking-[0.14em] sm:tracking-[0.18em] uppercase text-[#6E1B2D] mt-0.5 whitespace-nowrap leading-none">
            elevate your style with custom tees
          </span>
        )}
      </div>
    </div>
  );
};
