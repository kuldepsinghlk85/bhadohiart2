const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding 100 Rs to all product prices...");
  
  const products = await prisma.product.findMany();
  let count = 0;
  
  for (const p of products) {
    const currentPrice = p.basePrice || 0;
    await prisma.product.update({
      where: { id: p.id },
      data: {
        basePrice: currentPrice + 100,
        priceMode: p.priceMode === 'ENQUIRE' ? 'FIXED' : p.priceMode
      }
    });
    count++;
  }
  
  console.log(`Successfully updated ${count} products.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
