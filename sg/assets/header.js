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
        <li><a class="nav-link" href="https://engg-tech.com/sg/about/">About Us</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/services/">Services</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/projects/">Projects</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/blog/">Blog</a></li>
        <li><a class="nav-link" href="https://engg-tech.com/sg/contact-us/">Contact Us</a></li>
      </ul>
    </div>
  </div>
</nav>
  `;

  // Insert navbar
  document.getElementById("site-nav").innerHTML = navHTML;

  /* ---------------------------------------
     ACTIVE LINK LOGIC
  ---------------------------------------- */
  const links = document.querySelectorAll(".nav-link:not(.navbar-brand)");
  let current = window.location.pathname;

  if (current.length > 1 && current.endsWith("/")) {
    current = current.slice(0, -1);
  }

  links.forEach(link => {
    let href = new URL(link.href).pathname;

    if (href.length > 1 && href.endsWith("/")) {
      href = href.slice(0, -1);
    }

    if (href === current) {
      link.classList.add("active");
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
