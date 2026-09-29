const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const infinityData = [
  {
    design: "INFINITY 01",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "HAND CARDED NZ WOOL & REAL SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 02",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "HAND CARDED NZ WOOL & REAL SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 03",
    color: "PEARL",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "HAND CARDED NZ WOOL & REAL SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 04",
    color: "BEIGE",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "HAND CARDED NZ WOOL & REAL SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 05",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "HAND CARDED NZ WOOL & REAL MATAKA SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 06",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ INCH",
    size: "275X366",
    composition: "HAND CARDED NZ WOOL & REAL MATAKA SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 07",
    color: "MULTI",
    quality: "HANDKNOTTED 100 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "REAL SILK 100 %",
    finishing: "MARBLE FINISH",
    pileType: "CUT PILE",
    pileHeight: "3MM. APRX",
    thickness: "4-5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 08",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "WOOL & SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "4-5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 09",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "WOOL & SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "4-5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 10",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "WOOL & SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "4-5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 11",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "WOOL & SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "4-5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 12",
    color: "MULTI",
    quality: "HANDKNOTTED 81 KNOTTS PER SQ. INCH",
    size: "275X366",
    composition: "WOOL & SILK 50/50",
    finishing: "DISTRESED FINISH",
    pileType: "HIGH-LOW",
    pileHeight: "ZERO (WOOL), 3 MM. (SILK) APRX",
    thickness: "4-5 MM. APRX",
    weight: "03 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 13",
    color: "MULTI",
    quality: "TIBETAN 36 KNOTTS PER SQ. INCH",
    size: "SAMPLE (30X90 CM.)",
    composition: "NZ & NATURAL WOOL",
    finishing: "",
    pileType: "CUT & LOOP",
    pileHeight: "6-7 MM. APPROX",
    thickness: "8-10 MM. APRX",
    weight: "04 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 14",
    color: "MULTI",
    quality: "TIBETAN 36 KNOTTS PER SQ. INCH",
    size: "SAMPLE (30X90 CM.)",
    composition: "NZ & NATURAL WOOL",
    finishing: "",
    pileType: "CUT & LOOP",
    pileHeight: "6-7 MM. APPROX",
    thickness: "8-10 MM. APRX",
    weight: "04 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 15",
    color: "MULTI",
    quality: "TIBETAN 36 KNOTTS PER SQ. INCH",
    size: "SAMPLE (30X90 CM.)",
    composition: "NZ & NATURAL WOOL",
    finishing: "",
    pileType: "CUT & LOOP",
    pileHeight: "6-7 MM. APPROX",
    thickness: "8-10 MM. APRX",
    weight: "04 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 16",
    color: "MULTI",
    quality: "TIBETAN 36 KNOTTS PER SQ. INCH",
    size: "SAMPLE (30X90 CM.)",
    composition: "NZ & NATURAL WOOL",
    finishing: "",
    pileType: "CUT & LOOP",
    pileHeight: "6-7 MM. APPROX",
    thickness: "8-10 MM. APRX",
    weight: "04 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 17",
    color: "MULTI",
    quality: "TIBETAN 36 KNOTTS PER SQ. INCH",
    size: "SAMPLE (30X90 CM.)",
    composition: "NZ & NATURAL WOOL",
    finishing: "",
    pileType: "CUT & LOOP",
    pileHeight: "6-7 MM. APPROX",
    thickness: "8-10 MM. APRX",
    weight: "04 KG. APRX",
    madeIn: "INDIA"
  },
  {
    design: "INFINITY 18",
    color: "MULTI",
    quality: "TIBETAN 36 KNOTTS PER SQ. INCH",
    size: "SAMPLE (30X90 CM.)",
    composition: "NZ & NATURAL WOOL",
    finishing: "",
    pileType: "CUT & LOOP",
    pileHeight: "6-7 MM. APPROX",
    thickness: "8-10 MM. APRX",
    weight: "04 KG. APRX",
    madeIn: "INDIA"
  }
];

async function main() {
  console.log("Seeding Infinity Collection...");

  // Upsert the "Contemporary" or "Infinity" collection
  // Based on the rugs (Handknotted, Silk, Abstract/Distressed), "Contemporary" fits well,
  // or we can create a dedicated "Infinity" collection.
  const collection = await prisma.collection.upsert({
    where: { slug: 'infinity' },
    update: {},
    create: {
      name: 'Infinity',
      slug: 'infinity',
      description: 'A luxurious collection of handknotted contemporary carpets.'
    }
  });

  console.log(`Ensured collection: ${collection.name}`);

  for (const item of infinityData) {
    const slug = item.design.toLowerCase().replace(/\s+/g, '-');
    
    // Create a detailed description
    let desc = `The ${item.design} carpet in ${item.color}. Features ${item.quality} quality. Size: ${item.size}. Composition: ${item.composition}.`;
    if (item.finishing) desc += ` Finishing: ${item.finishing}.`;
    desc += ` Pile type: ${item.pileType}. Pile height: ${item.pileHeight}. Thickness: ${item.thickness}. Weight: ${item.weight}. Made in ${item.madeIn}.`;

    const product = await prisma.product.upsert({
      where: { slug },
      update: {
        description: desc
      },
      create: {
        name: item.design,
        slug,
        collectionId: collection.id,
        priceMode: 'ENQUIRE',
        description: desc,
        rating: 5,
        images: {
          create: {
            url: '/images/emerald-meadow.png', // Placeholder image for now
            isMain: true
          }
        }
      }
    });
    console.log(`Created product: ${product.name}`);
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
