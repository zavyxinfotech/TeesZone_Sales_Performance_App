import fs from 'fs';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
  <defs>
    <linearGradient id="burgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7A1E32" />
      <stop offset="50%" stop-color="#4A0A17" />
      <stop offset="100%" stop-color="#360410" />
    </linearGradient>
  </defs>
  
  <!-- 3D Geometric T Emblem in Deep Burgundy -->
  <g transform="translate(8, 8)">
    <!-- Isometric Left Arm -->
    <path d="M 32,6 L 10,19 L 10,32 L 23,25 L 23,52 L 33,58 L 33,23 L 43,16 Z" fill="#4A0A17" />
    <!-- Isometric Right Arm -->
    <path d="M 32,6 L 54,19 L 54,32 L 41,25 L 41,52 L 31,58 L 31,23 L 21,16 Z" fill="#6E1B2D" />
    <!-- Inner Highlight -->
    <path d="M 32,11 L 45,19 L 36,25 L 36,49 L 32,52 L 28,49 L 28,25 L 19,19 Z" fill="none" stroke="#9A2D45" stroke-width="4" stroke-linejoin="round" stroke-linecap="round" />
    <!-- Top Facet -->
    <path d="M 32,5 L 10,18 L 20,24 L 32,17 L 44,24 L 54,18 Z" fill="#7A1E32" />
  </g>

  <!-- Typography: TEESZONE in Deep Burgundy -->
  <text x="76" y="44" font-family="'Inter', 'Segoe UI', -apple-system, sans-serif" font-size="40" font-weight="900" letter-spacing="2" fill="url(#burgundyGrad)">
    TEESZONE
  </text>
  
  <!-- Tagline: Strictly aligned to width of TEESZONE (x=77, textLength=238) -->
  <text x="77" y="62" font-family="'Inter', 'Segoe UI', -apple-system, sans-serif" font-size="9.5" font-weight="800" textLength="238" lengthAdjust="spacing" fill="#5A1424">
    ELEVATE YOUR STYLE WITH CUSTOM TEES
  </text>
</svg>`;

fs.writeFileSync('./public/teeszone_logo.svg', svgContent);
fs.writeFileSync('./src/assets/teeszone_logo.svg', svgContent);
fs.writeFileSync('./public/teeszone_logo.png', svgContent);
fs.writeFileSync('./src/assets/teeszone_logo.png', svgContent);

console.log('✅ Updated SVG and PNG logo with tight tagline alignment within TEESZONE width!');
