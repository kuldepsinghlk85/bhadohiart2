const { exportImages } = require('pdf-export-images');
const path = require('path');
const fs = require('fs');

async function main() {
  const pdfPath = "C:/Users/hp/.gemini/antigravity/brain/638ab808-7f9b-4e65-8b8c-46f30ba24fbd/.user_uploaded/media_1786241281704.pdf";
  const outputDir = path.join(__dirname, 'public', 'images', 'atoz');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Extracting images from ${pdfPath} to ${outputDir}`);
  
  try {
    const images = await exportImages(pdfPath, outputDir);
    console.log(`Extracted ${images.length} images!`);
  } catch (error) {
    console.error("Error extracting images:", error);
  }
}

main();
