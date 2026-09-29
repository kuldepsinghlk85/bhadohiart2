import { PrismaClient } from '@prisma/client';
import { mockProducts, mockCollections } from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration of mock data to Prisma...');

  // 1. Insert Collections
  for (const mockCol of mockCollections) {
    const existing = await prisma.collection.findUnique({
      where: { slug: mockCol.slug }
    });
    
    if (!existing) {
      await prisma.collection.create({
        data: {
          name: mockCol.name,
          slug: mockCol.slug
        }
      });
      console.log(`Created collection: ${mockCol.name}`);
    } else {
      console.log(`Collection already exists: ${mockCol.name}`);
    }
  }

  // 2. Insert Products
  for (const mockProd of mockProducts) {
    const existing = await prisma.product.findUnique({
      where: { slug: mockProd.slug }
    });
    
    if (!existing) {
      // Get the collection id
      const col = await prisma.collection.findUnique({
        where: { slug: mockProd.collection.slug }
      });
      
      if (!col) {
        console.log(`Skipping product ${mockProd.name} because collection ${mockProd.collection.slug} not found`);
        continue;
      }
      
      const newProduct = await prisma.product.create({
        data: {
          name: mockProd.name,
          slug: mockProd.slug,
          description: mockProd.description || '',
          basePrice: 0, // Using 0 for "Request Quote"
          collectionId: col.id,
          isVisible: true,
          isGrandRoomLook: mockProd.collection.slug === 'infinity', // Based on the previous logic
          priceMode: 'quote',
          images: {
            create: mockProd.images.map(img => ({
              url: img.url,
              isMain: img.isMain || false
            }))
          },
          features: JSON.stringify({
            features: mockProd.features || [],
            sizes: mockProd.sizes || [],
            details: mockProd.details || []
          })
        }
      });
      console.log(`Created product: ${newProduct.name}`);
    } else {
      console.log(`Product already exists: ${mockProd.name}`);
    }
  }
  
  console.log('Migration complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
