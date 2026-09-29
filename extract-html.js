const fs = require('fs');

const html = fs.readFileSync('bhadohi.html', 'utf8');

const products = [];
const collections = new Set();

// Just find anything that looks like a wp-content/uploads URL for an image
const urlRegex = /https:\/\/bhadohiartsweave\.in\/wp-content\/uploads\/[^"'\s>]+?\.(png|jpg|jpeg|webp)/gi;
let match;
const seen = new Set();

while ((match = urlRegex.exec(html)) !== null) {
    let src = match[0];
    
    // Ignore small thumbnails, logos, icons, etc.
    if (src.includes('-150x150') || src.includes('-300x300') || src.includes('-430x430') || src.includes('-768x768') || src.includes('-800x800') || src.includes('-700x700')) continue;
    if (src.includes('logo') || src.includes('icon') || src.includes('banner')) continue;
    
    if (seen.has(src)) continue;
    seen.add(src);
    
    let category = "Exclusive Collection";
    if (src.includes('knotted')) category = 'Hand-Knotted';
    else if (src.includes('tufted')) category = 'Hand-Tufted';
    else if (src.includes('loomed')) category = 'Hand-Loomed';
    else if (src.includes('modern')) category = 'Modern Abstract';
    else category = 'Hand-Knotted'; // Default
    
    collections.add(category);
    
    const slug = 'rug-' + (products.length + 1);
    
    products.push({
        id: 'prod_' + (products.length + 1),
        name: "Bhadohi Rug " + (products.length + 1),
        type: category,
        price: "Request Quote",
        image: src,
        rating: 5,
        slug: slug,
        description: "Authentic carpet from Bhadohi Arts Weave.",
        features: ["Handcrafted", "Premium Quality", "Authentic Design"],
        sizes: ["5x8", "8x10"],
        collection: { name: category, slug: category.toLowerCase().replace(/ /g, '-') },
        isBestSeller: products.length < 6,
        images: [{ url: src, isMain: true }]
    });
}

const finalCollections = Array.from(collections).map((name, i) => ({
    id: (i + 1).toString(),
    name: name,
    slug: name.toLowerCase().replace(/ /g, '-')
}));

const mockDataContent = `// Automatically extracted from bhadohiartsweave.in
export const mockCollections = ${JSON.stringify(finalCollections, null, 2)};

export const mockProducts = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/lib/mockData.ts', mockDataContent);
console.log(`Extracted ${finalCollections.length} collections and ${products.length} products.`);
