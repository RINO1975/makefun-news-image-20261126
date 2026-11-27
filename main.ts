import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';

// The image is built beforehand. Runtime needs only this file and entry.png.
const EXPECTED_SHA256 = '1edbe0fd62c2d7d7d00e82c6c1ceebb02e1ff28665b4402d1697c1c5e6c29a59';
const PNG_MAGIC = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const MAX_BYTES = 1_048_576;

try {
  const image = readFileSync(new URL('./entry.png', import.meta.url));
  if (image.length < 33 || image.length > MAX_BYTES) {
    throw new Error(`PNG size ${image.length} is outside the permitted range`);
  }
  if (!image.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error('Invalid PNG signature');
  }
  if (image.readUInt32BE(8) !== 13 || image.toString('ascii', 12, 16) !== 'IHDR') {
    throw new Error('Missing PNG IHDR');
  }
  if (image.readUInt32BE(16) !== 1024 || image.readUInt32BE(20) !== 1024) {
    throw new Error('PNG dimensions must be exactly 1024 × 1024');
  }
  // Check that every declared PNG chunk is present, checksummed, and terminated.
  let offset = 8;
  let sawData = false;
  let sawEnd = false;
  while (offset < image.length) {
    if (offset + 12 > image.length) throw new Error('Truncated PNG chunk header');
    const length = image.readUInt32BE(offset);
    const end = offset + 12 + length;
    if (end > image.length) throw new Error('Truncated PNG chunk data');
    const type = image.toString('ascii', offset + 4, offset + 8);
    let crc = 0xffffffff;
    for (let i = offset + 4; i < offset + 8 + length; i++) {
      crc ^= image[i];
      for (let bit = 0; bit < 8; bit++) {
        crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
      }
    }
    if (((crc ^ 0xffffffff) >>> 0) !== image.readUInt32BE(end - 4)) {
      throw new Error(`PNG checksum mismatch in ${type}`);
    }
    if (type === 'IDAT') sawData = true;
    if (type === 'IEND') {
      if (length !== 0 || end !== image.length) throw new Error('Invalid PNG end marker');
      sawEnd = true;
    }
    offset = end;
  }
  if (!sawData || !sawEnd) throw new Error('PNG image data or end marker missing');
  const digest = createHash('sha256').update(image).digest('hex');
  if (digest !== EXPECTED_SHA256) throw new Error(`PNG SHA-256 mismatch: ${digest}`);
  const output = resolve(process.env.MAKEFUN_OUTPUT_DIR || '/output');
  mkdirSync(output, { recursive: true });
  const destination = join(output, 'entry.png');
  writeFileSync(destination, image);
  if (!readFileSync(destination).equals(image)) throw new Error('Output read-back differs from source');
  console.log(`entry.png: ${image.length} bytes; sha256 ${digest}`);
} catch (error) {
  console.error('Entry generation failed:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
