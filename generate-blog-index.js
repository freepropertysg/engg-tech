const fs = require("fs");
const path = require("path");

// ===============================
// CONFIG
// ===============================
const BLOG_DIR = path.join(__dirname, "blog");
const INDEX_FILE = path.join(BLOG_DIR, "index.html");

// ===============================
// SAFETY CHECKS
// ===============================
if (!fs.existsSync(BLOG_DIR)) {
  throw new Error("blog folder not found");
}

if (!fs.existsSync(INDEX_FILE)) {
  throw new Error("blog/index.html not found");
}

// ===============================
// READ INDEX FILE
// ===============================
const html = fs.readFileSync(INDEX_FILE, "utf8");

// ===============================
// READ BLOG POSTS
// ===============================
const posts = fs.readdirSync(BLOG_DIR)
  .filter(file => file.endsWith(".html") && file !== "index.html")
  .sort();

// ===============================
// BUILD LIST
// ===============================
const list = posts.map(file => {
  const slug = file.replace(".html", "");
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  return `  <li><a href="/blog/${slug}">${title}</a></li>`;
}).join("\n");

// ===============================
// REPLACE LIST BLOCK
// ===============================
const updated = html.replace(
  /<!-- BLOG-LIST-START -->[\s\S]*?<!-- BLOG-LIST-END -->/,
  `<!-- BLOG-LIST-START -->\n<ul class="blog-list">\n${list}\n</ul>\n<!-- BLOG-LIST-END -->`
);

// ===============================
// WRITE BACK
// ===============================
fs.writeFileSync(INDEX_FILE, updated, "utf8");

console.log("✅ Blog index updated: /blog/index.html");