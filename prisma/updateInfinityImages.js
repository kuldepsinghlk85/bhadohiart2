const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  console.log("Updating Infinity Collection Images...");

  for (let i = 1; i <= 18; i++) {
    const designNo = `INFINITY ${String(i).padStart(2, '0')}`;
    const slug = designNo.toLowerCase().replace(/\s+/g, '-');
    const pageNum = i + 1; // Infinity 01 is on page 2
    
    // Find images for this page
    const imagesDir = path.join(__dirname, '..', 'public', 'images', 'infinity');
    const files = fs.readdirSync(imagesDir).filter(f => f.startsWith(`img_p${pageNum}_`) && f.endsWith('.png'));
    
    if (files.length === 0) {
      console.log(`No images found for ${designNo} (page ${pageNum})`);
      continue;
    }

    // Sort files by size or just use them as is (usually 1, 2, 3)
    files.sort();

    // Get product
    const product = await prisma.product.findUnique({
      where: { slug }
    });

    if (product) {
      // Delete existing placeholder images
      await prisma.productImage.deleteMany({
        where: { productId: product.id }
      });

      // Add new images
      for (let j = 0; j < files.length; j++) {
        const file = files[j];
        await prisma.productImage.create({
          data: {
            url: `/images/infinity/${file}`,
            isMain: j === 0, // First image is main
            productId: product.id
          }
        });
      }
      console.log(`Updated images for ${product.name}: ${files.join(', ')}`);
    } else {
      console.log(`Product not found: ${slug}`);
    }
  }

  console.log("Image update complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
