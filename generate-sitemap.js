const fs = require("fs");
const path = require("path");

const baseUrl = "https://engg-tech.com";
const rootDir = __dirname;
const blogDir = path.join(rootDir, "blog");
const output = path.join(rootDir, "sitemap.xml");

let urls = [
  "/",
  "/about-us/",
  "/services/",
  "/projects/",
  "/contact-us/",
  "/privacy-policy/",
  "/blog/"
];

if (fs.existsSync(blogDir)) {
  fs.readdirSync(blogDir)
    .filter(f => f.endsWith(".html") && f !== "index.html")
    .forEach(f => urls.push(`/blog/${f}`));
}

const today = new Date().toISOString().split("T")[0];

const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `
  <url>
    <loc>${baseUrl}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join("")}
</urlset>`;

fs.writeFileSync(output, xml, "utf8");
console.log("sitemap.xml generated");
