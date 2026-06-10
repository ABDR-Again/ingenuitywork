const fs = require('fs');
const path = require('path');

const directoryPath = 'c:\\new website\\src\\partials';
const files = fs.readdirSync(directoryPath).filter(f => f.endsWith('.hbs'));

const replacements = [
  // Primary Oranges
  { regex: /#F2701B/gi, replacement: '#FACC15' },
  { regex: /#F2701F/gi, replacement: '#FACC15' },
  { regex: /#F26A1B/gi, replacement: '#FACC15' },
  { regex: /#F05A28/gi, replacement: '#FACC15' },
  { regex: /#F2641E/gi, replacement: '#FACC15' },
  { regex: /#F2691A/gi, replacement: '#FACC15' },
  
  // Soft / Light Oranges
  { regex: /#fff4ec/gi, replacement: '#FEF9C3' },
  { regex: /#fff3ea/gi, replacement: '#FEF9C3' },
  { regex: /#FFF5F0/gi, replacement: '#FEF9C3' },
  { regex: /#fff5ee/gi, replacement: '#FEF9C3' },
  { regex: /#faf6f3/gi, replacement: '#FEF9C3' },
  
  // Mid / Border Oranges
  { regex: /#f7d6bd/gi, replacement: '#FEF08A' },
  { regex: /#fbdac3/gi, replacement: '#FEF08A' },
  { regex: /#fde4d2/gi, replacement: '#FEF08A' },
  { regex: /#ffe6d2/gi, replacement: '#FEF08A' },
  
  // Variable names
  { regex: /--wcu-orange/g, replacement: '--wcu-yellow' },
  { regex: /--ts-orange/g, replacement: '--ts-yellow' },
  { regex: /--pf-orange/g, replacement: '--pf-yellow' },
  { regex: /--ind-primary-orange/g, replacement: '--ind-primary-yellow' },
  { regex: /--ind-orange-light/g, replacement: '--ind-yellow-light' },
  { regex: /--orange/g, replacement: '--yellow' },
  
  // Text words (if any like 'text-orange-...' or 'bg-orange-...')
  // Tailwind was already covered but just in case
  { regex: /orange-500/g, replacement: 'yellow-400' },
  { regex: /orange-600/g, replacement: 'yellow-500' },
  { regex: /orange-100/g, replacement: 'yellow-100' },
  { regex: /orange-50/g, replacement: 'yellow-50' }
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
