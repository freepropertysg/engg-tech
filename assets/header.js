document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     COUNTRY BASE LOGIC
  ============================== */
  let parts = location.pathname.split("/").filter(Boolean);
  let seg = parts[0] || "";
  let isCountry = /^[a-z]{2}$/.test(seg);

  if (isCountry) localStorage.setItem("et_country", seg);

  let saved = localStorage.getItem("et_country");
  let base = isCountry ? `/${seg}` : (saved ? `/${saved}` : "");

  const BASE_URL = "https://engg-tech.com/";

  /* =============================
     INLINE CSS (COUNTRY SELECTOR)
  ============================== */
  const style = document.createElement("style");
  style.textContent = `
  .et-country-wrap{
    position:relative;
    display:flex;
    align-items:center;
  }
  .et-country-input{
  display:inline-flex;
  align-items:center;
  gap:6px;
  font-size:14px;
  font-weight:600;
  padding:4px 8px;
  border:none;
  background:transparent;
  color:#fff;
  cursor:pointer;
  white-space:nowrap;
  }
  .et-country-dropdown{
    position:absolute;
    top:110%;
    right:0;
    width:260px;
    background:#fff;
    border:1px solid #ccc;
    border-radius:4px;
    box-shadow:0 4px 14px rgba(0,0,0,.12);
    z-index:9999;
  }
  .et-country-search{
    width:100%;
    padding:6px 8px;
    border:none;
    border-bottom:1px solid #ddd;
    outline:none;
    font-size:14px;
    box-sizing:border-box;
  }
  .et-country-list{
    max-height:240px;
    overflow-y:auto;
  }
  .et-country-item{
    padding:6px 10px;
    cursor:pointer;
  }
  .et-country-item:hover{
    background:#f3f4f6;
  }
  `;
  document.head.appendChild(style);

  /* =============================
     NAVIGATION HTML
  ============================== */
  const navHTML = `
<nav class="navbar-custom" aria-label="Main Navigation">
  <div class="navbar-container">

    <a href="${base || "/sg/"}" class="navbar-brand nav-link">
      ENGG-TECH.COM
    </a>

    <span class="menu-toggle"
          aria-controls="navbarMenu"
          aria-expanded="false"
          role="button"
          tabindex="0">☰</span>

    <div class="navbar-nav">
      <ul id="navbarMenu">
        <li><a class="nav-link" href="${base || "/sg/"}">Home</a></li>
        <li><a class="nav-link" href="/about-us/">About</a></li>
        <li><a class="nav-link" href="${base}/services/">Services</a></li>
        <li><a class="nav-link" href="${base}/projects/">Projects</a></li>
        <li><a class="nav-link" href="${base}/blog/">Blog</a></li>
        <li><a class="nav-link" href="/contact-us/">Contact</a></li>

        <li class="et-country-wrap">
          <div class="et-country-input" id="etCountryInput">
            <span id="etCountryLabel">🌍 Select country</span>
          </div>
          <div class="et-country-dropdown" id="etCountryDropdown" hidden>
            <input class="et-country-search" id="etCountrySearch" placeholder="Search country">
            <div class="et-country-list" id="etCountryList"></div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</nav>
  `;

  document.getElementById("site-nav").innerHTML = navHTML;

  /* =============================
     ACTIVE LINK
  ============================== */
  const links = document.querySelectorAll(".nav-link:not(.navbar-brand)");
  let current = location.pathname.replace(/\/$/, "") || "/";

  links.forEach(link => {
    let href = new URL(link.href).pathname.replace(/\/$/, "") || "/";
    if (href === current) link.classList.add("active");
  });

  /* =============================
     MOBILE MENU
  ============================== */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("navbarMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("show");
      toggle.setAttribute(
        "aria-expanded",
        toggle.getAttribute("aria-expanded") !== "true"
      );
    });
  }

  /* =============================
     COUNTRY SELECTOR LOGIC
  ============================== */
  const input = document.getElementById("etCountryInput");
  const label = document.getElementById("etCountryLabel");
  const dropdown = document.getElementById("etCountryDropdown");
  const listBox = document.getElementById("etCountryList");
  const search = document.getElementById("etCountrySearch");

  function flag(code){
    return code.toUpperCase().replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt()));
  }

  input.onclick = e => {
    e.stopPropagation();
    dropdown.hidden = !dropdown.hidden;
    search.focus();
  };

  document.addEventListener("click", () => dropdown.hidden = true);

  /* Load saved country label */
  if (saved) {
    fetch("https://restcountries.com/v3.1/alpha/" + saved)
      .then(r => r.json())
      .then(d => d[0] && (label.textContent = `${flag(saved)} ${d[0].name.common}`))
      .catch(()=>{});
  }

  /* Load countries */
  fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
    .then(r=>r.json())
    .then(countries=>{
      countries
        .filter(c=>c.cca2)
        .sort((a,b)=>a.name.common.localeCompare(b.name.common))
        .forEach(c=>{
          const div=document.createElement("div");
          div.className="et-country-item";
          div.textContent=`${flag(c.cca2)} ${c.name.common}`;
          div.dataset.code=c.cca2.toLowerCase();
          div.dataset.name=c.name.common;

          div.onclick=()=>{
            const target=BASE_URL+div.dataset.code+"/";
            fetch(target,{method:"HEAD"})
              .then(res=>{
                if(res.ok){
                  localStorage.setItem("et_country", div.dataset.code);
                  location.href=target;
                }else{
                  alert(`Engg-Tech is currently not available in ${div.dataset.name}. Please email info@engg-tech.com`);
                }
              });
          };
          listBox.appendChild(div);
        });
    });

  search.oninput=()=>{
    const q=search.value.toLowerCase();
    listBox.querySelectorAll(".et-country-item").forEach(i=>{
      i.style.display=i.textContent.toLowerCase().includes(q)?"block":"none";
    });
  };

});
