import React from 'react';

export const TeeszoneLogo = ({ className = "h-8 sm:h-9 md:h-10 w-auto" }) => {
  return (
    <img
      src="/teeszone_logo.png"
      alt="TEESZONE"
      className={`object-contain select-none border-none shadow-none outline-none ${className}`}
      draggable={false}
    />
  );
};
