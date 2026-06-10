const fs = require('fs');

const inputFile = 'c:\\new website\\New folder\\services.html';
const outputFile = 'c:\\new website\\src\\partials\\services.hbs';

let content = fs.readFileSync(inputFile, 'utf-8');

// Extract the styles
const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
let styles = styleMatch ? styleMatch[1] : '';

// Fix CSS scoping safely
styles = styles.replace(/^([ \t]*)([^;{}]+?)\s*\{/gm, (match, spaces, sel) => {
  // Ignore comments inside the selector match if any
  if (sel.includes('/*') || sel.includes('*/')) return match;
  
  if (sel.trim().startsWith('@') || sel.trim().startsWith(':root') || sel.trim() === 'body' || sel.trim() === 'html') {
    if (sel.trim() === 'body' || sel.trim() === 'html') {
      return spaces + '#new-services-wrapper {';
    }
    return match;
  }
  
  const scoped = sel.split(',').map(s => {
    s = s.trim();
    if (!s) return '';
    return '#new-services-wrapper ' + s;
  }).join(', ');
  
  return spaces + scoped + ' {';
});

const bodyMatch = content.match(/<div class="intro-spacer"><\/div>[\s\S]*?<main class="cards-wrapper">([\s\S]*?)<\/main>/);
const bodyContent = bodyMatch ? bodyMatch[0] : '';

const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
let scriptContent = scriptMatch ? scriptMatch[1] : '';
scriptContent = scriptContent.replace("document.querySelectorAll('.card')", "document.querySelectorAll('#new-services-wrapper .card')");

const finalContent = `
<!-- SCOPED SERVICES SECTION -->
<style>
${styles}
</style>

<div id="new-services-wrapper">
${bodyContent}
</div>

<script>
${scriptContent}
</script>
`;

fs.writeFileSync(outputFile, finalContent);
console.log('Successfully fixed scoping in services.hbs');
