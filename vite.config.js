import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to get all HTML files recursively
function getHtmlFiles(dir, fileList = {}) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = resolve(dir, file);
        if (filePath.includes('node_modules') || filePath.includes('\\dist\\') || filePath.includes('.git')) {
            continue;
        }
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            // Generate a flat key name like "about_index" or "services_web-design_index"
            let relPath = filePath.replace(__dirname, '').replace(/\\/g, '_').replace(/^\_/, '').replace(/\.html$/, '');
            if(!relPath) relPath = "index";
            fileList[relPath] = filePath;
        }
    }
    return fileList;
}

const inputHtmlFiles = getHtmlFiles(__dirname);

export default defineConfig({
  base: './', // Fix for GitHub pages absolute paths
  server: {
    port: 5173,
    open: true
  },
  build: {
    rollupOptions: {
      input: inputHtmlFiles
    }
  }
});