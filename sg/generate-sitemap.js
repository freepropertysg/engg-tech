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

// priority rules (Engg-Tech specific)
function getPriority(u) {
  if (u === "/") return "1.0";
  if (u === "/services/") return "0.9";
  if (u === "/projects/") return "0.8";
  if (u === "/blog/") return "0.7";
  if (u.startsWith("/blog/")) return "0.6";
  if (u === "/about-us/") return "0.6";
  if (u === "/contact-us/") return "0.5";
  if (u === "/privacy-policy/") return "0.3";
  return "0.5";
}

const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `
  <url>
    <loc>${baseUrl}${u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${getPriority(u)}</priority>
  </url>`).join("")}
</urlset>`;

fs.writeFileSync(output, xml, "utf8");
console.log("sitemap.xml generated");

