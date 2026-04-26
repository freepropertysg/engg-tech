document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------
     NAVIGATION HTML (SG)
  ---------------------------------------- */
  const navHTML = `
<nav class="navbar-custom" aria-label="Main Navigation">
  <div class="navbar-container">
    <a href="https://engg-tech.com/" class="navbar-brand nav-link">
      ENGG-TECH.COM
    </a>

    <span class="menu-toggle"
          aria-controls="navbarMenu"
          aria-expanded="false"
          role="button"
          tabindex="0">
      ☰
    </span>

    <div class="navbar-nav">
      <ul id="navbarMenu">
        <li><a class="nav-link" href="https://engg-tech.com/">Home</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/about-us/">About</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/services/">Services</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/projects/">Projects</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/blog/">Blog</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/contact-us/">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>
  `;

  // Insert navbar
  document.getElementById("site-nav").innerHTML = navHTML;

  /* =============================
   ACTIVE LINK (WORKING)
============================= */
const links = document.querySelectorAll("#navbarMenu .nav-link");
let path = window.location.pathname.toLowerCase();
path = path.replace(/index\.html$/, "");
path = path.replace(/\.html$/, "");
path = path.replace(/\/$/, "");
if (path === "") path = "/";

links.forEach(a => {
  const url = new URL(a.href);
  let href = url.pathname.toLowerCase();
href = href.replace(/index\.html$/, "");
href = href.replace(/\.html$/, "");
href = href.replace(/\/$/, "");
if (href === "") href = "/";

  // HOME
  if (path === "/" && href === "/") {
    a.classList.add("active");
    return;
  }

  // BLOG (index + articles)
  if (href.startsWith("/blog") && path.startsWith("/blog")) {
  a.classList.add("active");
  return;
  }

  // Exact match
  if (href === path) {
    a.classList.add("active");
  }
});

  /* ---------------------------------------
     MOBILE MENU TOGGLE
  ---------------------------------------- */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("navbarMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");

      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
    });
  }

});