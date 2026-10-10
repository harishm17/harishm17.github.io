// Writes the "HM" monogram icons into public/: favicon.svg, favicon.ico (16, 32 and 48 px), favicon-192.png and
// apple-touch-icon.png. Run `npm run favicons` after changing the design below. Keep the file names: search
// engines cache favicons by URL for weeks.
//
// The letters are outlines, not <text>, so every browser and crawler draws the same shapes whatever fonts it
// has. They are Schibsted Grotesk (SIL OFL 1.1) at weight 700, the site's typeface. H and M are straight-line
// glyphs, so their outlines are written here in font units (2048 per em, y up) as read from the variable font.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const INK = '#121212';
const PAPER = '#ffffff';
const UNITS_PER_EM = 2048;
const CAP_HEIGHT = 1440;
const GLYPHS = [
  { advance: 1542.32, points: [[142, 0], [142, 1440], [451, 1440], [451, 853], [1091, 853], [1091, 1440], [1400, 1440], [1400, 0], [1091, 0], [1091, 592], [451, 592], [451, 0]] },
  { advance: 1915.77, points: [[102, 0], [182, 1440], [684, 1440], [975, 208], [939, 208], [1232, 1440], [1734, 1440], [1814, 0], [1513, 0], [1449, 1220], [1452, 1220], [1147, 0], [769, 0], [464, 1220], [467, 1220], [403, 0]] },
];

/** The monogram centred in a 32x32 box: letters at `fontSize`, on a rounded square (or a full square when `radius` is 0). */
function svg({ fontSize = 15, radius = 6 } = {}) {
  const s = fontSize / UNITS_PER_EM;
  let x = 0;
  const placed = GLYPHS.map((g) => {
    const at = x;
    x += g.advance;
    return g.points.map(([px, py]) => [at + px, py]);
  });
  const all = placed.flat();
  const minX = Math.min(...all.map(([px]) => px));
  const maxX = Math.max(...all.map(([px]) => px));
  const left = (32 - (maxX - minX) * s) / 2 - minX * s;
  const baseline = (32 + CAP_HEIGHT * s) / 2;
  const r = (n) => Math.round(n * 100) / 100;
  const d = placed.map((pts) => `M${pts.map(([px, py]) => `${r(left + px * s)} ${r(baseline - py * s)}`).join('L')}Z`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="${radius}" fill="${INK}"/><path d="${d}" fill="${PAPER}"/></svg>\n`;
}

const png = (markup, size) => sharp(Buffer.from(markup), { density: (72 * size) / 32 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/** An ICO with one 32-bit BMP image per size, the most widely read form (Windows XP onward, every crawler). */
async function ico(markup, sizes) {
  const images = [];
  for (const size of sizes) {
    const rgba = await sharp(Buffer.from(markup), { density: (72 * size) / 32 }).resize(size, size).ensureAlpha().raw().toBuffer();
    const header = Buffer.alloc(40);
    header.writeUInt32LE(40, 0);
    header.writeInt32LE(size, 4);
    header.writeInt32LE(size * 2, 8); // XOR image plus AND mask
    header.writeUInt16LE(1, 12);
    header.writeUInt16LE(32, 14);
    const pixels = Buffer.alloc(size * size * 4);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const from = (y * size + x) * 4;
        const to = ((size - 1 - y) * size + x) * 4; // BMP rows run bottom-up
        pixels[to] = rgba[from + 2];
        pixels[to + 1] = rgba[from + 1];
        pixels[to + 2] = rgba[from];
        pixels[to + 3] = rgba[from + 3];
      }
    }
    const mask = Buffer.alloc(Math.ceil(size / 32) * 4 * size); // all zero: the alpha channel decides
    images.push({ size, data: Buffer.concat([header, pixels, mask]) });
  }
  const dir = Buffer.alloc(6 + 16 * images.length);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(images.length, 4);
  let offset = dir.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    dir.writeUInt8(size % 256, e);
    dir.writeUInt8(size % 256, e + 1);
    dir.writeUInt16LE(1, e + 4);
    dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(data.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([dir, ...images.map((i) => i.data)]);
}

const rounded = svg();
// iOS rounds the corners itself and fills transparent ones with black, so the touch icon is a full square.
const square = svg({ radius: 0 });
const out = {
  'public/favicon.svg': Buffer.from(rounded),
  'public/favicon.ico': await ico(rounded, [16, 32, 48]),
  'public/favicon-192.png': await png(rounded, 192),
  'public/apple-touch-icon.png': await png(square, 180),
};
for (const [file, data] of Object.entries(out)) {
  writeFileSync(file, data);
  console.log(file, data.length, 'bytes');
}
