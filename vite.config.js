import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  server: {
    port: 5173,
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        pricing: resolve(__dirname, "pricing/index.html"),
        process: resolve(__dirname, "process/index.html"),
        services: resolve(__dirname, "services/index.html"),
        testimonials: resolve(__dirname, "testimonials/index.html"),

        service_web_design: resolve(__dirname, "services/web-design/index.html"),
        service_seo: resolve(__dirname, "services/seo/index.html"),
        service_google_ads: resolve(__dirname, "services/google-ads/index.html"),
        service_branding: resolve(__dirname, "services/branding/index.html"),
        service_automation: resolve(__dirname, "services/automation/index.html"),
        service_maintenance: resolve(__dirname, "services/maintenance/index.html"),
        service_content_creation: resolve(__dirname, "services/content-creation/index.html"),
        service_graphic_design: resolve(__dirname, "services/graphic-design/index.html"),
        service_meta_ads: resolve(__dirname, "services/meta-ads/index.html"),
        service_social_media: resolve(__dirname, "services/social-media/index.html"),

        case_studies: resolve(__dirname, "case-studies/index.html"),
        cs_luxewear: resolve(__dirname, "case-studies/luxewear-redesign/index.html"),
        cs_healthfirst: resolve(__dirname, "case-studies/healthfirst-seo/index.html"),
        cs_propvault: resolve(__dirname, "case-studies/propvault-google-ads/index.html"),
        cs_craftbrew: resolve(__dirname, "case-studies/craftbrew-branding/index.html"),
        cs_finedge: resolve(__dirname, "case-studies/finedge-automation/index.html"),
        cs_travelnest: resolve(__dirname, "case-studies/travelnest-maintenance/index.html"),
        cs_eduspark: resolve(__dirname, "case-studies/eduspark-content/index.html"),
        cs_fitpulse: resolve(__dirname, "case-studies/fitpulse-design/index.html"),
        cs_glowskin: resolve(__dirname, "case-studies/glowskin-meta-ads/index.html"),
        cs_petpals: resolve(__dirname, "case-studies/petpals-social/index.html"),
      }
    }
  }
});