const fs = require("fs");
const path = require("path");

const blogDir = path.join(__dirname, "blog");
const indexFile = path.join(blogDir, "index.html");

if (!fs.existsSync(blogDir) || !fs.existsSync(indexFile)) {
  console.log("Blog folder or index.html missing");
  process.exit(0);
}

let html = fs.readFileSync(indexFile, "utf8");

const posts = fs.readdirSync(blogDir)
  .filter(f => f.endsWith(".html") && f !== "index.html")
  .sort()
  .reverse();

const listHtml = posts.map(f => {
  const title = f
    .replace(".html", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());

  return `  <li><a href="/blog/${f}">${title}</a></li>`;
}).join("\n");

const start = "<!-- BLOG-LIST-START -->";
const end = "<!-- BLOG-LIST-END -->";
const regex = new RegExp(`${start}[\\s\\S]*?${end}`, "m");

html = html.replace(
  regex,
`${start}
<ul class="blog-list">
${listHtml}
</ul>
${end}`
);

fs.writeFileSync(indexFile, html, "utf8");

console.log("blog/index.html regenerated from folder contents");
