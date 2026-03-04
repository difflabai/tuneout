#!/usr/bin/env node
// Generate TuneOut extension icons as PNG files
// Run: node generate-icons.js

const fs = require('fs');
const path = require('path');

// Simple PNG encoder for small monochrome icons
// Creates a minimal valid PNG with the TuneOut shield design

function createPNG(size) {
  const { createCanvas } = (() => {
    // Try canvas module, fall back to raw PNG generation
    try { return require('canvas'); } catch { return {}; }
  })();

  if (createCanvas) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    drawIcon(ctx, size);
    return canvas.toBuffer('image/png');
  }

  // Fallback: generate a simple SVG and note it needs conversion
  return null;
}

function drawIcon(ctx, size) {
  const s = size / 32; // scale factor

  // Background
  const r = 6 * s;
  ctx.fillStyle = '#1a1a2e';
  roundRect(ctx, 0, 0, size, size, r);
  ctx.fill();

  // Lines (briefing icon)
  ctx.strokeStyle = '#00d4aa';
  ctx.lineWidth = 2 * s;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(8 * s, 12 * s);
  ctx.lineTo(24 * s, 12 * s);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(8 * s, 16 * s);
  ctx.lineTo(20 * s, 16 * s);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(8 * s, 20 * s);
  ctx.lineTo(22 * s, 20 * s);
  ctx.stroke();

  // Accent dot
  ctx.fillStyle = '#00d4aa';
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.arc(24 * s, 10 * s, 4 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Generate SVG fallback icons (always works, no dependencies)
function createSVG(size) {
  const s = size / 32;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#1a1a2e"/>
  <path d="M8 12h16M8 16h12M8 20h14" stroke="#00d4aa" stroke-width="2" stroke-linecap="round" fill="none"/>
  <circle cx="24" cy="10" r="4" fill="#00d4aa" opacity="0.4"/>
</svg>`;
}

const sizes = [16, 48, 128];
const iconsDir = path.join(__dirname, 'icons');

if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir);

let usedCanvas = false;
for (const size of sizes) {
  const png = createPNG(size);
  if (png) {
    fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), png);
    usedCanvas = true;
    console.log(`Generated icons/icon${size}.png`);
  } else {
    // Write SVG and convert with ImageMagick if available
    const svgPath = path.join(iconsDir, `icon${size}.svg`);
    fs.writeFileSync(svgPath, createSVG(size));
    console.log(`Generated icons/icon${size}.svg (convert to PNG with: convert icon${size}.svg icon${size}.png)`);
  }
}

if (!usedCanvas) {
  console.log('\nNote: canvas module not available. SVG icons created.');
  console.log('Convert to PNG: for f in icons/*.svg; do convert "$f" "${f%.svg}.png"; done');
  console.log('Or install canvas: npm install canvas');
}
