import React from 'react';

export const TeeszoneLogo = ({ className = "h-8 sm:h-10 md:h-11 w-auto", showTagline = true }) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Deep Burgundy 3D Emblem */}
      <img
        src="/teeszone_icon.png"
        alt="TEESZONE"
        className="h-full w-auto object-contain flex-shrink-0"
        onError={(e) => {
          e.target.src = '/teeszone_logo.svg';
        }}
      />

      {/* Typography: Perfectly Aligned within TEESZONE Width */}
      <div className="flex flex-col justify-center max-w-fit">
        <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-[#4A0A17] leading-none drop-shadow-2xs select-none">
          TEESZONE
        </span>
        {showTagline && (
          <span className="text-[6.5px] sm:text-[7.5px] md:text-[8.5px] font-extrabold uppercase text-[#5A1424] mt-0.5 tracking-[0.02em] sm:tracking-[0.03em] whitespace-nowrap leading-none select-none text-justify">
            elevate your style with custom tees
          </span>
        )}
      </div>
    </div>
  );
};
