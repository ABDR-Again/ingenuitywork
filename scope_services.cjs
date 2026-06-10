const fs = require('fs');

const inputFile = 'c:\\new website\\New folder\\services.html';
const outputFile = 'c:\\new website\\src\\partials\\services.hbs';

let content = fs.readFileSync(inputFile, 'utf-8');

// Extract the styles
const styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
let styles = styleMatch ? styleMatch[1] : '';

// Prefix all CSS rules
styles = styles.replace(/^(?![ \t]*\/\*)([ \t]*)([a-zA-Z\.#*:][^{]*?)\{/gm, (match, spaces, selector) => {
  // Ignore media queries and root
  if (selector.trim().startsWith('@') || selector.trim() === ':root') {
    return match;
  }
  // Split multiple selectors separated by comma
  const scopedSelector = selector.split(',').map(s => {
    s = s.trim();
    if (s === '') return s;
    if (s.startsWith(':root')) return s; // leave root alone
    return `#new-services-wrapper ${s}`;
  }).join(', ');
  
  return `${spaces}${scopedSelector} {`;
});

// Extract the body (without scripts, or at least we'll adjust the script)
// We just want the spacer and the main wrapper
const bodyMatch = content.match(/<div class="intro-spacer"><\/div>[\s\S]*?<main class="cards-wrapper">([\s\S]*?)<\/main>/);
const bodyContent = bodyMatch ? bodyMatch[0] : '';

// Extract script
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
console.log('Successfully scoped and wrote services.hbs');
