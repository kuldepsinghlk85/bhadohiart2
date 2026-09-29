const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const aToZProducts = [
  "Floral Medallion Carpet",
  "Floral Palace Carpet",
  "Floral Vine Handwoven Carpet",
  "Blossom Heritage Carpet",
  "Royal Heritage Medallion Carpet",
  "Silver Mist Strata Carpet",
  "Elegant Earth Tone Textured Carpet",
  "Modern Textured Striped Luxury Carpet",
  "Rustic Earth Texture Carpet",
  "Golden Earth Texture Carpet",
  "Urban Shadow Stripes Carpet",
  "Emerald Geometric Luxe Carpet",
  "Golden Sand Textured Luxe Carpet",
  "Ocean Wave Abstract Luxury Carpet",
  "Sage Marble Luxe Carpet",
  "Desert Harmony Wave Carpet",
  "Sage Blossom Elegance Carpet",
  "Desert Harmony Abstract Carpet",
  "Sage Wave Elegance Carpet"
];

async function main() {
  console.log("Resetting all BestSellers...");
  await prisma.product.updateMany({
    data: { isBestSeller: false }
  });

  console.log("Setting A to Z products as BestSellers...");
  
  for (const name of aToZProducts) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const product = await prisma.product.findUnique({ where: { slug } });
    if (product) {
      await prisma.product.update({
        where: { slug },
        data: { isBestSeller: true }
      });
      console.log(`Set ${name} as BestSeller`);
    } else {
      console.log(`Could not find ${name}`);
    }
  }

  console.log("Done.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
