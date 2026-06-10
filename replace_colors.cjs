const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\new website\\src\\partials';
const files = fs.readdirSync(directoryPath).filter(f => f.endsWith('.hbs'));

const replacements = [
  { regex: /orange-500/g, replacement: 'yellow-400' },
  { regex: /orange-600/g, replacement: 'yellow-500' },
  { regex: /orange-100/g, replacement: 'yellow-100' },
  { regex: /orange-50/g, replacement: 'yellow-50' },
  { regex: /#F97316/gi, replacement: '#FACC15' },
  { regex: /#f97316/g, replacement: '#facc15' },
];

files.forEach(file => {
  const filePath = path.join(directoryPath, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  let modified = content;
  replacements.forEach(r => {
    modified = modified.replace(r.regex, r.replacement);
  });

  if (content !== modified) {
    fs.writeFileSync(filePath, modified);
    console.log(`Updated colors in ${file}`);
  }
});

// Also update new-home-animations.js
const animPath = 'c:\\new website\\src\\new-home-animations.js';
let animContent = fs.readFileSync(animPath, 'utf-8');
let newAnimContent = animContent;
replacements.forEach(r => {
  newAnimContent = newAnimContent.replace(r.regex, r.replacement);
});
if (animContent !== newAnimContent) {
  fs.writeFileSync(animPath, newAnimContent);
  console.log(`Updated colors in new-home-animations.js`);
}

// And tailwind config maybe? If there are any custom orange
const twPath = 'c:\\new website\\tailwind.config.js';
if(fs.existsSync(twPath)) {
  let twContent = fs.readFileSync(twPath, 'utf-8');
  let newTwContent = twContent;
  replacements.forEach(r => {
    newTwContent = newTwContent.replace(r.regex, r.replacement);
  });
  if (twContent !== newTwContent) {
    fs.writeFileSync(twPath, newTwContent);
    console.log(`Updated colors in tailwind.config.js`);
  }
}
