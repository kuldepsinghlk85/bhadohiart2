const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const images = await prisma.productImage.findMany({
    include: { product: true }
  });
  console.log("Images from DB:");
  images.forEach(i => {
    console.log(`${i.product?.slug}: ${i.url}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
