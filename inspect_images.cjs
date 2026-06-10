const fs = require('fs');
const path = require('path');

const partialsDir = path.join(__dirname, 'src', 'partials');
const files = fs.readdirSync(partialsDir).filter(f => f.endsWith('.hbs'));

for (const file of files) {
  const content = fs.readFileSync(path.join(partialsDir, file), 'utf-8');
  const imgMatches = content.match(/<img[^>]*>/g);
  if (imgMatches) {
    console.log(`\n--- ${file} ---`);
    imgMatches.forEach(img => console.log(img));
  }
}
