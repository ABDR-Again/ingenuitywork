import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const publicDir = 'c:\\new website\\public';
const images = [
    { src: 'shoaib.jpeg', dest: 'shoaib.webp' },
    { src: 'raheem.JPG', dest: 'raheem.webp' }
];

async function convert() {
    for (const img of images) {
        const srcPath = path.join(publicDir, img.src);
        const destPath = path.join(publicDir, img.dest);
        
        if (fs.existsSync(srcPath)) {
            console.log(`Converting ${img.src}...`);
            await sharp(srcPath)
                .webp({ quality: 80 })
                .toFile(destPath);
            console.log(`Successfully converted ${img.src} to ${destPath}`);
        } else {
            console.error(`File not found: ${srcPath}`);
        }
    }
}

convert().catch(console.error);
