const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const aToZProducts = [
  { collection: "Heritage", name: "Floral Medallion Carpet", description: "This luxurious handcrafted carpet features an elegant floral medallion design with intricate scrollwork and soft pastel tones of ivory, blue, red, and gold." },
  { collection: "Heritage", name: "Floral Palace Carpet", description: "An elegant luxury carpet featuring intricate floral and ornamental patterns in soft gold, pink, green, and blue tones." },
  { collection: "Heritage", name: "Floral Vine Handwoven Carpet", description: "This elegant handcrafted carpet features a soft ivory base with intricate floral vine patterns in green, red, pink, and golden tones." },
  { collection: "Heritage", name: "Blossom Heritage Carpet", description: "This elegant luxury carpet features a grand floral and geometric design with soft beige tones, highlighted by blue, green, and gold accents." },
  { collection: "Heritage", name: "Royal Heritage Medallion Carpet", description: "This elegant carpet features a luxurious cream base with intricate floral border patterns in rich gold, red, and blue tones." },
  { collection: "Life Style", name: "Silver Mist Strata Carpet", description: "A luxurious modern bedroom featuring a full-wall fitted textured carpet in elegant grey tones." },
  { collection: "Life Style", name: "Elegant Earth Tone Textured Carpet", description: "This carpet features a sophisticated textured weave in warm grey and brown tones, creating a cozy and elegant look." },
  { collection: "Life Style", name: "Modern Textured Striped Luxury Carpet", description: "This carpet features a modern textured stripe design in soft grey, beige, and charcoal tones." },
  { collection: "Life Style", name: "Rustic Earth Texture Carpet", description: "This carpet features a warm earthy brown tone with a subtle textured striped pattern, giving it a natural and elegant look." },
  { collection: "Life Style", name: "Golden Earth Texture Carpet", description: "This premium wall-to-wall carpet features a rich golden-brown tone with elegant textured patterns that add warmth and depth." },
  { collection: "Life Style", name: "Urban Shadow Stripes Carpet", description: "This carpet features a modern luxury design with elegant charcoal and grey tones, highlighted by bold linear patterns." },
  { collection: "Life Style", name: "Emerald Geometric Luxe Carpet", description: "This premium carpet features a rich forest green base with bold abstract line patterns, creating a modern and sophisticated look." },
  { collection: "Life Style", name: "Golden Sand Textured Luxe Carpet", description: "This elegant carpet features warm beige and sand tones with a subtle textured pattern, creating a calm and sophisticated look." },
  { collection: "Elegance", name: "Ocean Wave Abstract Luxury Carpet", description: "This carpet features a modern abstract wave design in deep navy blue, soft cream, and muted grey tones." },
  { collection: "Elegance", name: "Sage Marble Luxe Carpet", description: "This carpet features a modern abstract marble-inspired design in soft sage green, ivory, and grey tones." },
  { collection: "Elegance", name: "Desert Harmony Wave Carpet", description: "This elegant abstract carpet features flowing wave patterns in warm beige, cream, taupe, and brown tones." },
  { collection: "Elegance", name: "Sage Blossom Elegance Carpet", description: "A stylish modern carpet featuring an abstract floral pattern in soothing sage green, beige, taupe, and deep charcoal tones." },
  { collection: "Elegance", name: "Desert Harmony Abstract Carpet", description: "This elegant carpet features a modern abstract design with flowing curves in warm beige, cream, taupe, and brown tones." },
  { collection: "Elegance", name: "Sage Wave Elegance Carpet", description: "This carpet features a modern abstract wave design in soothing sage green, beige, and cream tones." }
];

async function main() {
  console.log("Seeding A to Z Collection...");

  const collections = {};
  for (const collName of ["Heritage", "Life Style", "Elegance"]) {
    const slug = collName.toLowerCase().replace(/\s+/g, '-');
    collections[collName] = await prisma.collection.upsert({
      where: { slug },
      update: {},
      create: {
        name: collName,
        slug,
        description: `Premium ${collName} collection by Bhadohi Arts Weave.`
      }
    });
    console.log(`Ensured collection: ${collName}`);
  }

  for (let i = 0; i < aToZProducts.length; i++) {
    const item = aToZProducts[i];
    const slug = item.name.toLowerCase().replace(/\s+/g, '-');
    const collection = collections[item.collection];

    const product = await prisma.product.upsert({
      where: { slug },
      update: {
        description: item.description,
        collectionId: collection.id
      },
      create: {
        name: item.name,
        slug,
        collectionId: collection.id,
        priceMode: 'ENQUIRE',
        description: item.description,
        rating: 5,
        images: {
          create: {
            url: '/images/emerald-meadow.png', // Temporary placeholder
            isMain: true
          }
        }
      }
    });
    console.log(`Created/Updated product: ${product.name}`);
  }

  console.log("Seeding complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
