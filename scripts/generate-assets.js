const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateAssets() {
  const logoPath = path.resolve(__dirname, '../src/assets/images/client/logo-new.jpg');
  const publicDir = path.resolve(__dirname, '../public');

  console.log('Generating high-res branding and social share assets from:', logoPath);

  // Circular mask for clean cut (removes square black borders from the original jpg)
  const size = 530;
  const radius = size / 2 - 2;
  const maskSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="#fff" /></svg>`
  );

  const maskedLogo = await sharp(logoPath)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 1. Generate 1200x630 Open Graph cover image (cover.jpg)
  const bgSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#143044" />
          <stop offset="50%" stop-color="#091b27" />
          <stop offset="100%" stop-color="#040d14" />
        </radialGradient>
        <radialGradient id="logoAura" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stop-color="rgba(200, 150, 62, 0.28)" />
          <stop offset="85%" stop-color="rgba(200, 150, 62, 0.08)" />
          <stop offset="100%" stop-color="rgba(200, 150, 62, 0)" />
        </radialGradient>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5d070" />
          <stop offset="50%" stop-color="#c8963e" />
          <stop offset="100%" stop-color="#9a6e20" />
        </linearGradient>
      </defs>

      <!-- Background Base -->
      <rect width="1200" height="630" fill="url(#bgGrad)" />

      <!-- Outer Decorative Golden Border -->
      <rect x="22" y="22" width="1156" height="586" rx="20" fill="none" stroke="rgba(200, 150, 62, 0.4)" stroke-width="2" />
      <rect x="30" y="30" width="1140" height="570" rx="14" fill="none" stroke="rgba(255, 255, 255, 0.07)" stroke-width="1" />

      <!-- Center Glow behind Circular Logo -->
      <circle cx="600" cy="315" r="290" fill="url(#logoAura)" />
      <!-- Golden Outer Ring Framing the Logo -->
      <circle cx="600" cy="315" r="268" fill="none" stroke="url(#gold)" stroke-width="4" />
      <circle cx="600" cy="315" r="275" fill="none" stroke="rgba(200, 150, 62, 0.3)" stroke-width="1.5" stroke-dasharray="6 4" />

      <!-- Left Column Typography (Completely Clear of Center Circle) -->
      <g>
        <rect x="54" y="200" width="220" height="26" rx="13" fill="rgba(200,150,62,0.15)" stroke="rgba(200,150,62,0.4)" stroke-width="1" />
        <text x="164" y="217" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#f5d070" letter-spacing="2" text-anchor="middle">
          DHARCHULA · UTTARAKHAND
        </text>

        <text x="54" y="270" font-family="Georgia, 'Playfair Display', serif" font-size="34" font-weight="700" fill="#ffffff" letter-spacing="0.5">
          Shiv Darshan
        </text>
        <text x="54" y="302" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="url(#gold)" letter-spacing="4">
          HOMESTAY · HAAT
        </text>

        <text x="54" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" fill="rgba(255,255,255,0.85)" font-style="italic">
          “More than a stay, it feels like home”
        </text>

        <text x="54" y="380" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#f5d070">
          ✦ On Adi Kailash &amp; Om Parvat Route
        </text>
        <text x="54" y="405" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="rgba(255,255,255,0.7)">
          Host: Govind Singh Dhami &amp; Family
        </text>
      </g>

      <!-- Right Column Badges (Completely Clear of Center Circle) -->
      <g>
        <rect x="910" y="200" width="230" height="26" rx="13" fill="rgba(200,150,62,0.15)" stroke="rgba(200,150,62,0.4)" stroke-width="1" />
        <text x="1025" y="217" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="700" fill="#f5d070" letter-spacing="2" text-anchor="middle">
          SACRED HIMALAYAS
        </text>

        <text x="910" y="270" font-family="Georgia, 'Playfair Display', serif" font-size="30" font-weight="700" fill="#ffffff">
          Pilgrim Base
        </text>
        <text x="910" y="302" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="url(#gold)" letter-spacing="2">
          WARM MOUNTAIN COMFORT
        </text>

        <text x="910" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" fill="rgba(255,255,255,0.85)">
          ✓ Heated Rooms &amp; 24×7 Hot Water
        </text>
        <text x="910" y="365" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" fill="rgba(255,255,255,0.85)">
          ✓ Fresh Organic Kumaoni Meals
        </text>
        <text x="910" y="390" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" fill="rgba(255,255,255,0.85)">
          ✓ Breathtaking River &amp; Peak Views
        </text>
      </g>
    </svg>
  `);

  const bgBuffer = await sharp(bgSvg).png().toBuffer();

  const coverJpgPath = path.join(publicDir, 'cover.jpg');
  await sharp(bgBuffer)
    .composite([
      {
        input: maskedLogo,
        top: Math.round((630 - size) / 2),
        left: Math.round((1200 - size) / 2),
      }
    ])
    .jpeg({ quality: 92, progressive: true })
    .toFile(coverJpgPath);
  console.log('Saved cover.jpg:', coverJpgPath);

  // 2. Also save direct 1024x1024 logo in public as shiv-darshan-logo.jpg
  const directLogoPath = path.join(publicDir, 'shiv-darshan-logo.jpg');
  await sharp(logoPath)
    .jpeg({ quality: 94, progressive: true })
    .toFile(directLogoPath);
  console.log('Saved shiv-darshan-logo.jpg:', directLogoPath);

  // 3. Generate logo192.png with circular cutout
  const mask192 = Buffer.from(
    '<svg width="192" height="192"><circle cx="96" cy="96" r="95" fill="#fff" /></svg>'
  );
  const logo192Path = path.join(publicDir, 'logo192.png');
  await sharp(logoPath)
    .resize(192, 192, { fit: 'cover' })
    .composite([{ input: mask192, blend: 'dest-in' }])
    .png()
    .toFile(logo192Path);
  console.log('Saved logo192.png:', logo192Path);

  // 4. Generate logo512.png with circular cutout
  const mask512 = Buffer.from(
    '<svg width="512" height="512"><circle cx="256" cy="256" r="254" fill="#fff" /></svg>'
  );
  const logo512Path = path.join(publicDir, 'logo512.png');
  await sharp(logoPath)
    .resize(512, 512, { fit: 'cover' })
    .composite([{ input: mask512, blend: 'dest-in' }])
    .png()
    .toFile(logo512Path);
  console.log('Saved logo512.png:', logo512Path);

  // 5. Generate apple-touch-icon.png with circular cutout
  const mask180 = Buffer.from(
    '<svg width="180" height="180"><circle cx="90" cy="90" r="89" fill="#fff" /></svg>'
  );
  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(logoPath)
    .resize(180, 180, { fit: 'cover' })
    .composite([{ input: mask180, blend: 'dest-in' }])
    .png()
    .toFile(appleTouchPath);
  console.log('Saved apple-touch-icon.png:', appleTouchPath);

  // 6. Generate favicon.ico (64x64 PNG inside ico format)
  const mask64 = Buffer.from(
    '<svg width="64" height="64"><circle cx="32" cy="32" r="31" fill="#fff" /></svg>'
  );
  const faviconPath = path.join(publicDir, 'favicon.ico');
  await sharp(logoPath)
    .resize(64, 64, { fit: 'cover' })
    .composite([{ input: mask64, blend: 'dest-in' }])
    .png()
    .toFile(faviconPath);
  console.log('Saved favicon.ico:', faviconPath);

  console.log('All branding and social share assets generated successfully!');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
