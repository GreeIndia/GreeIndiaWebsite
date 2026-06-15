import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoriesToProcess = [
  './public',
  './src/assets/images'
];

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.toLowerCase().endsWith('.png')) {
      console.log(`Processing: ${fullPath}`);
      const webpPath = fullPath.replace(/\.png$/i, '.webp');
      
      try {
        await sharp(fullPath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        console.log(`Successfully compressed to: ${webpPath}`);
        
        // Optionally delete the old png:
        // fs.unlinkSync(fullPath); 
      } catch (err) {
        console.error(`Error processing ${fullPath}:`, err);
      }
    }
  }
}

async function run() {
  for (const dir of directoriesToProcess) {
    await processDirectory(path.resolve(dir));
  }
  console.log('Finished compressing images.');
}

run();
