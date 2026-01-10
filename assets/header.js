// =============================
// Load Google Font (once)
// =============================
if (!document.getElementById("poppins-font")) {
  const l = document.createElement("link");
  l.id = "poppins-font";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap";
  document.head.appendChild(l);
}

document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     COUNTRY BASE LOGIC (IDENTICAL)
  ============================== */
  let parts = location.pathname.split("/").filter(Boolean);
  let seg = parts[0] || "";
  let isCountry = /^[a-z]{2}$/.test(seg);

  if (isCountry) localStorage.setItem("et_country", seg);

  let saved = localStorage.getItem("et_country");
  let base = isCountry ? `/${seg}` : (saved ? `/${saved}` : "");

  /* =============================
     INLINE CSS (MATCHED STYLE)
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
    font-size:16px;
    font-weight:600;
    line-height:1;
    padding:4px 8px;
    border:none;
    border-radius:4px;
    background:#fff;
    cursor:pointer;
    white-space:nowrap;
    width:auto;
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

  @media (max-width:768px){
    .et-country-input{
      font-size:18px;
      padding:10px 0;
      border:none;
    }
  }
  `;
  document.head.appendChild(style);

  /* =============================
     NAV HTML (STRUCTURE MATCHED)
  ============================== */
  const navHTML = `
  <nav class="navbar">
    <div class="nav-container">

      <a href="${base || "/"}" class="nav-logo"
       style="display:flex;flex-direction:column;line-height:1.1;text-decoration:none;padding:4px 0;">
        <span style="font-size:16px;font-family:Poppins,sans-serif;font-weight:600;color:#0F172A;">
          ENGG-TECH.COM
        </span>
        <span style="font-size:11.5px;font-weight:500;font-family:Poppins,sans-serif;color:#334155;">
          Fire Protection & M&E Contractor
        </span>
        <span style="font-size:10.5px;font-weight:400;font-family:Poppins,sans-serif;color:#64748B;">
          Singapore-based engineering services
        </span>
      </a>

      <span class="menu-toggle">☰</span>

      <ul class="nav-menu">
        <li><a href="${base || "/"}">HOME</a></li>
        <li><a href="/about-us/">ABOUT</a></li>
        <li><a href="${base}/services/">SERVICES</a></li>
        <li><a href="${base}/projects/">PROJECTS</a></li>
        <li><a href="${base}/blog/">BLOG</a></li>
        <li><a href="/contact-us/">CONTACT</a></li>

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
  </nav>
  `;

  document.getElementById("site-nav").innerHTML = navHTML;

  /* =============================
     ACTIVE LINK (SAME LOGIC)
  ============================== */
  const links = document.querySelectorAll(".nav-menu a");
  let current = location.pathname.replace(/\/$/, "") || "/";

  links.forEach(a => {
    let h = a.getAttribute("href").replace(/\/$/, "") || "/";
    if (h === current) a.classList.add("active");
  });

  /* =============================
     MOBILE MENU (IDENTICAL)
  ============================== */
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle) toggle.onclick = () => menu.classList.toggle("show");

  /* =============================
     COUNTRY SELECTOR LOGIC
  ============================== */
  const input = document.getElementById("etCountryInput");
  const label = document.getElementById("etCountryLabel");
  const dropdown = document.getElementById("etCountryDropdown");
  const listBox = document.getElementById("etCountryList");
  const search = document.getElementById("etCountrySearch");
  const BASE_URL = "https://engg-tech.com/";

  function flag(code){
    return code.toUpperCase().replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt()));
  }

  input.onclick = e => {
    e.stopPropagation();
    dropdown.hidden = !dropdown.hidden;
    search.focus();
  };

  document.addEventListener("click", () => dropdown.hidden = true);

  if (saved) {
    fetch("https://restcountries.com/v3.1/alpha/" + saved)
      .then(r => r.json())
      .then(d => d[0] && (label.textContent = `${flag(saved)} ${d[0].name.common}`))
      .catch(()=>{});
  }

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
