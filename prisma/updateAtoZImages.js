const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const aToZProducts = [
  { name: "Floral Medallion Carpet", page: 2 },
  { name: "Floral Palace Carpet", page: 3 },
  { name: "Floral Vine Handwoven Carpet", page: 4 },
  { name: "Blossom Heritage Carpet", page: 5 },
  { name: "Royal Heritage Medallion Carpet", page: 6 },
  { name: "Silver Mist Strata Carpet", page: 7 },
  { name: "Elegant Earth Tone Textured Carpet", page: 8 },
  { name: "Modern Textured Striped Luxury Carpet", page: 9 },
  { name: "Rustic Earth Texture Carpet", page: 10 },
  { name: "Golden Earth Texture Carpet", page: 11 },
  { name: "Urban Shadow Stripes Carpet", page: 12 },
  { name: "Emerald Geometric Luxe Carpet", page: 13 },
  { name: "Golden Sand Textured Luxe Carpet", page: 14 },
  { name: "Ocean Wave Abstract Luxury Carpet", page: 15 },
  { name: "Sage Marble Luxe Carpet", page: 16 },
  { name: "Desert Harmony Wave Carpet", page: 17 },
  { name: "Sage Blossom Elegance Carpet", page: 18 },
  { name: "Desert Harmony Abstract Carpet", page: 19 },
  { name: "Sage Wave Elegance Carpet", page: 20 }
];

async function main() {
  console.log("Updating A to Z Collection Images...");

  for (const item of aToZProducts) {
    const slug = item.name.toLowerCase().replace(/\s+/g, '-');
    const pageNum = item.page;
    
    // Find images for this page
    const imagesDir = path.join(__dirname, '..', 'public', 'images', 'atoz');
    const files = fs.readdirSync(imagesDir).filter(f => f.startsWith(`img_p${pageNum}_`) && f.endsWith('.png'));
    
    if (files.length === 0) {
      console.log(`No images found for ${item.name} (page ${pageNum})`);
      continue;
    }

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
            url: `/images/atoz/${file}`,
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
