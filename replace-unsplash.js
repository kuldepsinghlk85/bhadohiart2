const fs = require('fs');
const glob = require('glob');

const images = [
  '/images/emerald-meadow.png',
  '/images/royal-amethyst.png',
  '/images/ocean-mist.png',
  '/images/mocha-linea.png',
  '/images/velvet-plum.png',
  '/images/ivory-cloud.png',
  '/images/cinnamon-earth.png',
  '/images/arctic-pearl.png'
];

let imgIndex = 0;

function replaceUnsplash(content) {
  return content.replace(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?auto=format&fit=crop&q=80/g, () => {
    const replacement = images[imgIndex % images.length];
    imgIndex++;
    return replacement;
  });
}

glob.sync('src/**/*.tsx').forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('unsplash.com')) {
    const updated = replaceUnsplash(content);
    fs.writeFileSync(file, updated);
    console.log(`Updated ${file}`);
  }
});
