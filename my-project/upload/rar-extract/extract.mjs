import { createExtractorFromData } from 'node-unrar-js';
import fs from 'fs';
import path from 'path';

async function main() {
  const rarPath = '/home/z/my-project/upload/Advologos - Site v1-2.rar';
  const outputDir = '/home/z/my-project/upload/advologos-src';
  
  const data = new Uint8Array(fs.readFileSync(rarPath));
  const extractor = await createExtractorFromData({ data });
  
  const list = extractor.getFileList();
  const fileHeaders = [...list.fileHeaders];
  console.log(`Total files: ${fileHeaders.length}`);
  
  // Print first few to see structure
  for (const f of fileHeaders.slice(0, 5)) {
    console.log('File header keys:', Object.keys(f));
    console.log('File header:', JSON.stringify(f).substring(0, 200));
    break;
  }
  
  const srcFiles = fileHeaders.filter(f => {
    const name = f.filename || f.name || f.fileFilename || '';
    return !name.includes('node_modules');
  });
  console.log(`\nNon-node_modules files (${srcFiles.length}):`);
  for (const f of srcFiles) {
    const name = f.filename || f.name || f.fileFilename || 'unknown';
    const size = f.uncompressedSize || f.originalSize || f.fileSize || 0;
    console.log(`  ${name} (${size} bytes)`);
  }
  
  // Extract src files
  fs.mkdirSync(outputDir, { recursive: true });
  let extracted = 0;
  
  const fileNames = srcFiles.map(f => f.filename || f.name || f.fileFilename || '');
  
  try {
    const extractedData = extractor.extract({ files: fileNames });
    const entries = [...extractedData.files];
    
    for (const entry of entries) {
      const hdr = entry.fileHeader;
      const name = hdr.filename || hdr.name || hdr.fileFilename || '';
      if (!name.includes('node_modules') && !hdr.isDirectory) {
        const targetPath = path.join(outputDir, name.replace(/^Advologos - Site v1-2[\/\\]/, ''));
        fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        if (entry.extraction && entry.extraction.length > 0) {
          fs.writeFileSync(targetPath, entry.extraction);
          console.log(`Extracted: ${name}`);
          extracted++;
        }
      }
    }
  } catch (e) {
    console.error('Extraction error:', e.message);
  }
  
  console.log(`\nExtracted ${extracted} files`);
}

main().catch(console.error);
