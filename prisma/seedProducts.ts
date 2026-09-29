import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const ALL_PRODUCTS = [
  {
    name: 'Emerald Meadow',
    type: 'Handloom',
    price: 'Request Quote',
    image: '/images/emerald-meadow.png',
    rating: 5,
    slug: 'emerald-meadow',
  },
  {
    name: 'Royal Amethyst Luxe',
    type: 'Designer',
    price: 'Request Quote',
    image: '/images/royal-amethyst.png',
    rating: 5,
    slug: 'royal-amethyst-luxe',
  },
  {
    name: 'Ocean Mist',
    type: 'Handloom',
    price: 'Request Quote',
    image: '/images/ocean-mist.png',
    rating: 5,
    slug: 'ocean-mist',
  },
  {
    name: 'Mocha Linea Designer',
    type: 'Designer',
    price: 'Request Quote',
    image: '/images/mocha-linea.png',
    rating: 4,
    slug: 'mocha-linea-designer',
  },
  {
    name: 'Velvet Plum',
    type: 'Designer',
    price: 'Request Quote',
    image: '/images/velvet-plum.png',
    rating: 5,
    slug: 'velvet-plum',
  },
  {
    name: 'Ivory Cloud Plush',
    type: 'Plush',
    price: 'Request Quote',
    image: '/images/ivory-cloud.png',
    rating: 4,
    slug: 'ivory-cloud-plush',
  },
  {
    name: 'Cinnamon Earth',
    type: 'Handloom',
    price: 'Request Quote',
    image: '/images/cinnamon-earth.png',
    rating: 5,
    slug: 'cinnamon-earth',
  },
  {
    name: 'Arctic Pearl Plush',
    type: 'Plush',
    price: 'Request Quote',
    image: '/images/arctic-pearl.png',
    rating: 5,
    slug: 'arctic-pearl-plush',
  }
];

async function main() {
  console.log('Seeding products...');
  
  // Ensure Collections exist
  const types = Array.from(new Set(ALL_PRODUCTS.map(p => p.type)));
  
  const collections: Record<string, string> = {};
  for (const type of types) {
    const slug = type.toLowerCase().replace(/\s+/g, '-');
    const col = await prisma.collection.upsert({
      where: { slug },
      update: {},
      create: {
        name: type + ' Collection',
        slug,
      }
    });
    collections[type] = col.id;
  }

  // Seed Products
  for (const prod of ALL_PRODUCTS) {
    const p = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        name: prod.name,
        slug: prod.slug,
        collectionId: collections[prod.type],
        priceMode: 'ENQUIRE',
        rating: prod.rating,
        isBestSeller: true,
      }
    });

    // Ensure main image exists
    const existingImages = await prisma.productImage.findMany({ where: { productId: p.id } });
    if (existingImages.length === 0) {
      await prisma.productImage.create({
        data: {
          productId: p.id,
          url: prod.image,
          isMain: true,
        }
      })
    }
  }

  console.log('Products seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
