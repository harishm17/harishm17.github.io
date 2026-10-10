// Writes public/harish-manoharan.jpg, a 1200px square crop of the About photo at a URL that never changes.
// Structured data (Person.image on /about/) points at it, because the <Picture> files under /_astro/ get a new
// hash whenever the image is processed again. Run `npm run photo` after replacing src/assets/harish-manoharan.jpg.
import sharp from 'sharp';
import { statSync } from 'node:fs';

const out = 'public/harish-manoharan.jpg';
await sharp('src/assets/harish-manoharan.jpg')
  .resize(1200, 1200, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(out);
console.log(out, Math.round(statSync(out).size / 1024), 'KB');
