document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------
     NAVIGATION HTML (SG)
  ---------------------------------------- */
  const navHTML = `
<nav class="navbar-custom" aria-label="Main Navigation">
  <div class="navbar-container">
    <a href="https://engg-tech.com/sg/" class="navbar-brand nav-link">
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
        <li><a class="nav-link" href="https://engg-tech.com/sg/">Home</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/about-us/">About</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/services/">Services</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/projects/">Projects</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/blog/">Blog</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/contact-us/">Contact</a></li>
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
const path = window.location.pathname.replace(/\/$/, "") || "/";

links.forEach(a => {
  const url = new URL(a.href);
  const href = url.pathname.replace(/\/$/, "") || "/";

  // HOME
  if (path === "/" && href === "/") {
    a.classList.add("active");
    return;
  }

  // BLOG (index + articles)
  if (href === "/sg/blog" && path.startsWith("/sg/blog")) {
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

