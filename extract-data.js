const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log("Fetching collections...");
  const collections = await prisma.collection.findMany();
  
  console.log("Fetching products...");
  const products = await prisma.product.findMany({
    include: {
      images: true,
      collection: true
    }
  });

  console.log(`Found ${collections.length} collections and ${products.length} products.`);

  const mockDataContent = `// Automatically extracted from database
export const collections = ${JSON.stringify(collections, null, 2)};

export const products = ${JSON.stringify(products, null, 2)};
`;

  fs.writeFileSync(
    path.join(__dirname, 'src', 'lib', 'mockData.ts'),
    mockDataContent
  );
  console.log("Successfully wrote data to src/lib/mockData.ts");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
