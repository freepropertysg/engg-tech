const fs = require("fs");
const path = require("path");

// ===============================
// CONFIG
// ===============================
const SITE_URL = "https://engg-tech.com";
const BASE_PATH = "";
const BLOG_DIR = path.join(__dirname, "blog");

// today as YYYY-MM-DD
const today = new Date().toISOString().split("T")[0];

// ===============================
// HELPERS
// ===============================
function urlBlock(loc, priority, changefreq) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// ===============================
// URL COLLECTION
// ===============================
let urls = [];

// === STATIC PAGES ===
urls.push(
  urlBlock(`${SITE_URL}/`, "1.0", "weekly"),
  urlBlock(`${SITE_URL}/about/`, "0.8", "monthly"),
  urlBlock(`${SITE_URL}/services/`, "0.9", "weekly"),
  urlBlock(`${SITE_URL}/projects/`, "0.8", "monthly"),
  urlBlock(`${SITE_URL}/blog/`, "0.7", "weekly"),
  urlBlock(`${SITE_URL}/contact-us/`, "0.6", "monthly"),
  urlBlock(`${SITE_URL}/privacy-policy/`, "0.3", "yearly"),
);

// === BLOG POSTS ===
if (fs.existsSync(BLOG_DIR)) {
  fs.readdirSync(BLOG_DIR).forEach(file => {
    if (file.endsWith(".html") && file !== "index.html") {
      const slug = file.replace(".html", "");
      urls.push(
        urlBlock(`${SITE_URL}/blog/${slug}`, "0.6", "monthly")
      );
    }
  });
}

// ===============================
// SITEMAP OUTPUT
// ===============================
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap, "utf8");

console.log("✅ Sitemap generated: /sitemap.xml");