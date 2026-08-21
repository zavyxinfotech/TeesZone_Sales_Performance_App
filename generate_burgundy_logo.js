import fs from 'fs';

// Let's create an SVG logo for TEESZONE in Deep Burgundy
const burgundySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 80" width="420" height="80">
  <defs>
    <linearGradient id="burgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6E1B2D" />
      <stop offset="50%" stop-color="#4A0A17" />
      <stop offset="100%" stop-color="#360410" />
    </linearGradient>
    <linearGradient id="accentBurgundy" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7A1E32" />
      <stop offset="100%" stop-color="#4A0A17" />
    </linearGradient>
    <filter id="skeuoShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.3" />
    </filter>
  </defs>
  
  <!-- 3D Geometric T Emblem in Deep Burgundy -->
  <g transform="translate(10, 8)" filter="url(#skeuoShadow)">
    <!-- Isometric Left Arm Outer -->
    <path d="M 32,8 L 12,20 L 12,32 L 24,25 L 24,52 L 34,58 L 34,22 L 44,16 Z" fill="#4A0A17" />
    <!-- Isometric Right Arm Outer -->
    <path d="M 32,8 L 52,20 L 52,32 L 40,25 L 40,52 L 30,58 L 30,22 L 20,16 Z" fill="#6E1B2D" />
    <!-- Inner Ribbon Path Highlight -->
    <path d="M 32,12 L 46,21 L 37,27 L 37,50 L 32,53 L 27,50 L 27,27 L 18,21 Z" fill="none" stroke="#8E2A40" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" />
    <!-- Core Top Facet -->
    <path d="M 32,6 L 10,19 L 20,25 L 32,18 L 44,25 L 54,19 Z" fill="#7A1E32" />
  </g>

  <!-- Typography: TEESZONE in Bold Deep Burgundy -->
  <text x="80" y="44" font-family="'Inter', 'Arial Black', sans-serif" font-size="40" font-weight="900" letter-spacing="4" fill="url(#burgundyGrad)" filter="url(#skeuoShadow)">
    TEESZONE
  </text>
  
  <!-- Tagline: elevate your style with custom tees -->
  <text x="82" y="64" font-family="'Inter', -apple-system, sans-serif" font-size="11.5" font-weight="800" letter-spacing="2.5" fill="#5A1424">
    ELEVATE YOUR STYLE WITH CUSTOM TEES
  </text>
</svg>`;

fs.writeFileSync('./public/teeszone_logo.svg', burgundySvg);
fs.writeFileSync('./src/assets/teeszone_logo.svg', burgundySvg);
console.log('✅ Created Burgundy SVG logo!');
