// Compressão local das fotografias JPG em /public/images.
// Uso: pnpm run optimize:images
// Pré-requisito: sharp instalado como devDependency (pnpm add -D sharp).
import { readdir, stat, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

// Limites por papel: o hero vira 1920px (cobre telas grandes); as demais 1600px é suficiente.
const LIMITS = new Map([
  ['ponte-hercilio-luz-hero.jpg', 1920],
  ['ponte-hercilio-luz-panorama.jpg', 1680],
]);

async function run() {
  const files = (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f));
  if (files.length === 0) {
    console.log('Nenhum JPG encontrado em public/images.');
    return;
  }
  let totalBefore = 0;
  let totalAfter = 0;
  for (const file of files.sort()) {
    const filePath = path.join(dir, file);
    const before = (await stat(filePath)).size;
    totalBefore += before;
    const limit = LIMITS.get(file) ?? 1600;
    const tmpPath = path.join(dir, `.tmp-${file}`);

    await sharp(filePath, { failOn: 'none', density: 72 })
      .rotate() // aplica orientação EXIF automaticamente
      .resize({ width: limit, height: limit, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .withMetadata({ orientation: 1 })
      .toFile(tmpPath);

    const after = (await stat(tmpPath)).size;
    await rename(tmpPath, filePath);
    totalAfter += after;
    const pct = (((before - after) / before) * 100).toFixed(1);
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB  (-${pct}%)`);
  }
  console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> ${(totalAfter / 1024 / 1024).toFixed(2)} MB  (-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
