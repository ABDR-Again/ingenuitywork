const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public', 'optimized');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

// Rules for specific images
const maxSizes = {
    'logo': 300,
    'hero': 1200,
    'about': 800,
    'service': 600,
    'default': 800
};

function getResizeOptions(filename) {
    const lowerName = filename.toLowerCase();
    let width = maxSizes['default'];

    if (lowerName.includes('logo')) {
        width = maxSizes['logo'];
    } else if (lowerName.includes('hero')) {
        width = maxSizes['hero'];
    } else if (lowerName.includes('about')) {
        width = maxSizes['about'];
    } else if (lowerName.includes('service') || lowerName.includes('ads') || lowerName.includes('gmb') || lowerName.includes('seo') || lowerName.includes('wordpress') || lowerName.includes('shopify') || lowerName.includes('meta')) {
        width = maxSizes['service'];
    }

    return { width, withoutEnlargement: true };
}

async function optimizeImages() {
    try {
        const files = fs.readdirSync(inputDir);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                const inputPath = path.join(inputDir, file);
                const baseName = path.basename(file, ext);
                const outputPath = path.join(outputDir, `${baseName}.webp`);

                const resizeOpts = getResizeOptions(file);

                await sharp(inputPath)
                    .resize(resizeOpts)
                    .webp({ quality: 80, effort: 6 })
                    .toFile(outputPath);
                
                console.log(`Optimized: ${file} -> ${baseName}.webp (Max width: ${resizeOpts.width})`);
            }
        }
        console.log("All images optimized successfully.");
    } catch (err) {
        console.error("Error optimizing images:", err);
    }
}

optimizeImages();
