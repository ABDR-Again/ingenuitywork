const fs = require('fs');
const path = require('path');

const partialsDir = path.join(__dirname, 'src', 'partials');

const replacements = {
  'about-us.hbs': [
    '/optimized/about-1.webp',
    '/optimized/about-2.webp',
    '/optimized/about-3.webp',
    '/optimized/hero-2.webp',
    '/optimized/hero-3.webp',
    '/optimized/hero-4.webp'
  ],
  'footer.hbs': ['/optimized/ingen-work-logo.JPG.webp'],
  'portfolio.hbs': [
    '/optimized/Capture.JPG.webp',
    '/optimized/stayinhomecarerr.JPG.webp',
    '/optimized/musicandfilm.JPG.webp',
    '/optimized/Quiro_Esplugues.JPG.webp',
    '/optimized/Capture.JPG.webp',
    '/optimized/stayinhomecarerr.JPG.webp',
    '/optimized/musicandfilm.JPG.webp',
    '/optimized/Quiro_Esplugues.JPG.webp'
  ],
  'services.hbs': [
    '/optimized/ads.webp',
    '/optimized/business gmb.webp',
    '/optimized/website-service.webp',
    '/optimized/meta.webp',
    '/optimized/gohighlevel-service.webp',
    '/optimized/landing-service.webp'
  ],
  'team.hbs': [
    '/optimized/raheem.webp',
    '/optimized/sajid.webp',
    '/optimized/shoaib.webp',
    '/optimized/raheem.webp',
    '/optimized/sajid.webp',
    '/optimized/shoaib.webp',
    '/optimized/raheem.webp',
    '/optimized/sajid.webp'
  ],
  'why-choose-us.hbs': [
    '/optimized/hero-2.webp',
    '/optimized/about-1.webp',
    '/optimized/about-2.webp'
  ]
};

// Replace empty src="" with the arrays above
for (const [file, sources] of Object.entries(replacements)) {
  const filePath = path.join(partialsDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let idx = 0;
    content = content.replace(/src="(?:https:\/\/placehold\.co[^"]*|)?"/g, (match) => {
      if (idx < sources.length) {
        return `src="${sources[idx++]}" loading="lazy"`;
      }
      return match;
    });
    fs.writeFileSync(filePath, content);
  }
}

// Special cases for tools.hbs and tracking.hbs
const toolsFile = path.join(partialsDir, 'tools.hbs');
if (fs.existsSync(toolsFile)) {
    let content = fs.readFileSync(toolsFile, 'utf-8');
    content = content.replace('https://www.vectorlogo.zone/logos/google_ads/google_ads-icon.svg', '/optimized/ads.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg', '/optimized/analytics.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/googletagmanager/googletagmanager-icon.svg', '/optimized/tag-manager.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/meta/meta-icon.svg', '/optimized/meta.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/wordpress/wordpress-icon.svg', '/optimized/wordpress.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/shopify/shopify-icon.svg', '/optimized/shopify.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/google_search_console/google_search_console-icon.svg', '/optimized/search-console.webp');
    // Replace mailchimp with zapier as we don't have mailchimp logo
    content = content.replace('https://www.vectorlogo.zone/logos/mailchimp/mailchimp-icon.svg" alt="Mailchimp"', '/optimized/zapier.webp" alt="Zapier"');
    content = content.replace('https://www.vectorlogo.zone/logos/zapier/zapier-icon.svg', '/optimized/zapier.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/google/google-icon.svg', '/optimized/business gmb.webp');
    fs.writeFileSync(toolsFile, content);
}

const trackingFile = path.join(partialsDir, 'tracking.hbs');
if (fs.existsSync(trackingFile)) {
    let content = fs.readFileSync(trackingFile, 'utf-8');
    content = content.replace('https://www.vectorlogo.zone/logos/googletagmanager/googletagmanager-icon.svg', '/optimized/tag-manager.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/google_ads/google_ads-icon.svg', '/optimized/ads.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/meta/meta-icon.svg', '/optimized/pixel.webp');
    content = content.replace('https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg', '/optimized/analytics.webp');
    fs.writeFileSync(trackingFile, content);
}

// Special case for header logo
const headerFile = path.join(partialsDir, 'header.hbs');
if (fs.existsSync(headerFile)) {
    let content = fs.readFileSync(headerFile, 'utf-8');
    content = content.replace(/src=""/g, `src="/optimized/ingen-work-logo.JPG.webp"`);
    fs.writeFileSync(headerFile, content);
}

console.log("Images replaced successfully!");
