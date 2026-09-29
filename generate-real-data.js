const fs = require('fs');

const realImages = [
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/201B.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/202A.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/202B.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/203A.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/203B.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/301.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/301-B.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/303.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/304.png",
    "https://bhadohiartsweave.in/wp-content/uploads/2025/11/305.png"
];

const products = [];
const collections = new Set(['Hand-Knotted', 'Hand-Tufted', 'Hand-Loomed']);

realImages.forEach((src, i) => {
    let category = 'Hand-Knotted';
    if (i > 3 && i <= 6) category = 'Hand-Tufted';
    if (i > 6) category = 'Hand-Loomed';
    
    // Extract a name from the URL
    let name = src.split('/').pop().replace('.png', '').replace('.jpg', '');
    name = "Design " + name;
    
    products.push({
        id: 'prod_' + (i + 1),
        name: name,
        type: category,
        price: "Request Quote",
        image: src,
        rating: 5,
        slug: 'rug-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: "An authentic, handcrafted carpet from Bhadohi Arts Weave.",
        features: ["Handcrafted", "Premium Quality", "Authentic Design"],
        sizes: ["5x8", "8x10"],
        collection: { name: category, slug: category.toLowerCase().replace(/ /g, '-') },
        isBestSeller: i < 6,
        images: [{ url: src, isMain: true }]
    });
});

const finalCollections = Array.from(collections).map((name, i) => ({
    id: (i + 1).toString(),
    name: name,
    slug: name.toLowerCase().replace(/ /g, '-')
}));

const mockDataContent = `// Automatically generated from real website images
export const mockCollections = ${JSON.stringify(finalCollections, null, 2)};

export const mockProducts = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/lib/mockData.ts', mockDataContent);
console.log(`Generated mockData.ts with ${finalCollections.length} collections and ${products.length} products using REAL data images.`);
