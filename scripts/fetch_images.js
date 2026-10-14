const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = new URL(url);
    const req = https.get(
      {
        hostname: options.hostname,
        path: options.pathname + options.search,
        headers: {
          'User-Agent': 'ShivDarshanHomestayBot/1.0 (https://github.com/mayurpatil70/Shiv-Darshan-Homestay; client-branding@homestay.in)',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        }
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          return resolve(download(res.headers.location, dest));
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`Failed with HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(fs.statSync(dest).size);
        });
      }
    );
    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  const images = [
    {
      name: 'adi-kailash-gauri-kund.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Gauri_Kund%2C_Adi_Kailash.jpg/1920px-Gauri_Kund%2C_Adi_Kailash.jpg'
    },
    {
      name: 'adi-kailash-trek3.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Adi-kailash-trek3.jpg'
    },
    {
      name: 'adi-kailash-mountain-uttarakhand.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Adi_Kailash_Mountain_At_Uttarakhand.jpg'
    },
    {
      name: 'adi-kailash-divine-beauty.jpg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Adi_Kailash_-_The_Divine_Beauty.jpg/1920px-Adi_Kailash_-_The_Divine_Beauty.jpg'
    }
  ];

  const outDir = path.join(__dirname, '..', 'src', 'assets', 'images', 'client');
  for (const img of images) {
    const target = path.join(outDir, img.name);
    try {
      console.log(`Downloading ${img.url} -> ${img.name}...`);
      const size = await download(img.url, target);
      console.log(`Successfully downloaded ${img.name}: ${(size / 1024).toFixed(1)} KB`);
    } catch (e) {
      console.error(`Error downloading ${img.name}:`, e.message);
    }
  }
}

main();
