import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.xml': 'application/xml', '.txt': 'text/plain',
};

async function tryRead(path) {
  try { return await readFile(path); } catch { return null; }
}

createServer(async (req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  url = decodeURIComponent(url);

  // Try exact file first, then .html extension (clean URLs)
  let data = await tryRead(join(__dirname, url));
  let ext = extname(url);

  if (!data && !ext) {
    data = await tryRead(join(__dirname, url + '.html'));
    ext = '.html';
  }

  if (data) {
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
