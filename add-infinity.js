const fs = require('fs');
const mockDataPath = 'src/lib/mockData.ts';
let data = fs.readFileSync(mockDataPath, 'utf8');

const infinityProducts = [
  { name: 'Infinity 01', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Hand Carded NZ Wool & Real Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 02', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Hand Carded NZ Wool & Real Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 03', color: 'Pearl', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Hand Carded NZ Wool & Real Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 04', color: 'Beige', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Hand Carded NZ Wool & Real Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 05', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Hand Carded NZ Wool & Real Mataka Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 06', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Hand Carded NZ Wool & Real Mataka Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 07', color: 'Multi', quality: 'Handknotted 100 Knots/sq inch', size: '275x366 cm', composition: 'Real Silk 100%', finish: 'Marble Finish', pileType: 'Cut Pile', pileHeight: '3 mm', thickness: '4-5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 08', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Wool & Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '4-5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 09', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Wool & Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '4-5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 10', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Wool & Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '4-5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 11', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Wool & Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '4-5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 12', color: 'Multi', quality: 'Handknotted 81 Knots/sq inch', size: '275x366 cm', composition: 'Wool & Silk 50/50', finish: 'Distressed Finish', pileType: 'High-Low', pileHeight: '0-3 mm', thickness: '4-5 mm', weight: '3 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 13', color: 'Multi', quality: 'Tibetan 36 Knots/sq inch', size: 'Sample (30x90 cm)', composition: 'NZ & Natural Wool', finish: 'N/A', pileType: 'Cut & Loop', pileHeight: '6-7 mm', thickness: '8-10 mm', weight: '4 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 14', color: 'Multi', quality: 'Tibetan 36 Knots/sq inch', size: 'Sample (30x90 cm)', composition: 'NZ & Natural Wool', finish: 'N/A', pileType: 'Cut & Loop', pileHeight: '6-7 mm', thickness: '8-10 mm', weight: '4 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 15', color: 'Multi', quality: 'Tibetan 36 Knots/sq inch', size: 'Sample (30x90 cm)', composition: 'NZ & Natural Wool', finish: 'N/A', pileType: 'Cut & Loop', pileHeight: '6-7 mm', thickness: '8-10 mm', weight: '4 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 16', color: 'Multi', quality: 'Tibetan 36 Knots/sq inch', size: 'Sample (30x90 cm)', composition: 'NZ & Natural Wool', finish: 'N/A', pileType: 'Cut & Loop', pileHeight: '6-7 mm', thickness: '8-10 mm', weight: '4 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 17', color: 'Multi', quality: 'Tibetan 36 Knots/sq inch', size: 'Sample (30x90 cm)', composition: 'NZ & Natural Wool', finish: 'N/A', pileType: 'Cut & Loop', pileHeight: '6-7 mm', thickness: '8-10 mm', weight: '4 kg/sqm', madeIn: 'India' },
  { name: 'Infinity 18', color: 'Multi', quality: 'Tibetan 36 Knots/sq inch', size: 'Sample (30x90 cm)', composition: 'NZ & Natural Wool', finish: 'N/A', pileType: 'Cut & Loop', pileHeight: '6-7 mm', thickness: '8-10 mm', weight: '4 kg/sqm', madeIn: 'India' }
];

// Add collection if not exists
if (!data.includes('slug: "infinity"')) {
  const newCollection = `
  {
    "id": "col_infinity",
    "name": "Infinity",
    "slug": "infinity"
  },`;
  data = data.replace('export const mockCollections = [', 'export const mockCollections = [' + newCollection);
}

// Add products
let newProducts = '';
infinityProducts.forEach((p, i) => {
  const num = i + 1;
  const slug = `infinity-${num.toString().padStart(2, '0')}`;
  newProducts += `
  {
    "id": "prod_${slug}",
    "name": "${p.name} - ${p.color}",
    "type": "Infinity",
    "price": "Request Quote",
    "image": "/images/products/${slug}.jpg",
    "rating": 5,
    "slug": "${slug}",
    "description": "Premium ${p.quality} carpet featuring ${p.composition}. ${p.finish !== 'N/A' ? p.finish + ' with ' : ''}${p.pileType} pile. Crafted in ${p.madeIn}.",
    "features": [
      "${p.quality}",
      "${p.composition}",
      "${p.pileType}"
    ],
    "sizes": [
      "${p.size}"
    ],
    "collection": {
      "name": "Infinity",
      "slug": "infinity"
    },
    "isBestSeller": false,
    "images": [
      {
        "url": "/images/products/${slug}.jpg",
        "isMain": true
      }
    ],
    "details": [
      { "key": "Quality", "value": "${p.quality}" },
      { "key": "Composition", "value": "${p.composition}" },
      { "key": "Pile Type", "value": "${p.pileType}" },
      { "key": "Pile Height", "value": "${p.pileHeight}" },
      { "key": "Thickness", "value": "${p.thickness}" },
      { "key": "Weight/SQM", "value": "${p.weight}" },
      { "key": "Made In", "value": "${p.madeIn}" }
    ]
  },`;
});

// Check if infinity products are already added to prevent duplicates
if (!data.includes('slug: "infinity-01"')) {
  data = data.replace('export const mockProducts = [', 'export const mockProducts = [' + newProducts);
  fs.writeFileSync(mockDataPath, data);
  console.log('Successfully added Infinity collection and products.');
} else {
  console.log('Products already exist in mockData.ts');
}
