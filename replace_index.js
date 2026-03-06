import fs from 'fs';

let content = fs.readFileSync('c:\\new website\\index.html', 'utf8');

// Replace cards using a robust regex that ignores minor whitespace differences
const cardsRegex = /<!-- Card 1 -->[\s\S]*?<!-- Card 4 -->[\s\S]*?<\/div>\r?\n/;
const cardsReplacement = `<!-- Card 1 -->
<why-choose-us-card icon="star" title="Quality" description="Top-tier code standards, accessible design, and pixel-perfect implementation for every project."></why-choose-us-card>
<!-- Card 2 -->
<why-choose-us-card icon="bolt" title="Speed" description="Rapid delivery timelines without cutting corners. We use modern stacks to deploy faster."></why-choose-us-card>
<!-- Card 3 -->
<why-choose-us-card icon="visibility" title="Clarity" description="Transparent communication from day one. No jargon, just clear updates and strategy."></why-choose-us-card>
<!-- Card 4 -->
<why-choose-us-card icon="support_agent" title="After-Support" description="We don't disappear after launch. Ongoing maintenance and support are part of our DNA."></why-choose-us-card>
`;

content = content.replace(cardsRegex, cardsReplacement);

// Add script tag
const scriptTarget = '<script src="/src/components/site-modal.js" type="module"></script>';
const scriptReplacement = '<script src="/src/components/site-modal.js" type="module"></script>\n<script src="/src/components/why-choose-us-card.js" type="module"></script>';
content = content.replace(scriptTarget, scriptReplacement);

fs.writeFileSync('c:\\new website\\index.html', content);
console.log('Successfully updated index.html with new web components.');
