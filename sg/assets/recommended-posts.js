<script>
document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     ENG-G-TECH BLOG + SG PAGES
  ============================== */
  const path = window.location.pathname;

  // Allow /blog/ and /sg/ pages only
  if (!path.startsWith("/blog/") && !path.startsWith("/sg/")) return;

  // Detect correct blog base
  const isSG = path.startsWith("/sg/");
  const blogBase = isSG ? "/sg/blog/" : "/blog/";
  const blogLinkMatch = blogBase;

  /* ==============================
     INLINE CSS (SCOPED)
  ============================== */
  const css = `
    .recommended-posts-section,
    .faq-section{
      margin:2.5rem 0;
      padding:0;
    }
    .recommended-posts-section h2,
    .faq-section h2{
      font-size:1.6rem;
      margin-bottom:1rem;
      color:#212529;
      font-weight:700;
    }
    .recommended-posts-container{
      display:flex;
      flex-direction:column;
      gap:1rem;
    }
    .reco-post-link{
      text-decoration:none;
      color:#000;
      padding:0.2rem 0;
      display:block;
      transition:color .2s ease;
    }
    .reco-post-link:hover{
      color:#ff6a00;
    }
    .faq-item{
      margin-bottom:1.2rem;
    }
    .faq-item strong{
      display:block;
      margin-bottom:0.3rem;
    }
  `;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  /* ==============================
     CONTENT BLOCK HTML
  ============================== */
  const blockHTML = `
    <section class="recommended-posts-section">
      <h2>Recommended Articles</h2>
      <div id="recommendedContainer" class="recommended-posts-container"></div>
    </section>

    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <strong>What services does Engg-Tech provide?</strong>
        <p>Engg-Tech provides fire protection systems, M&E works, electrical, plumbing, renovation, and general engineering services.</p>
      </div>

      <div class="faq-item">
        <strong>Does Engg-Tech handle small projects?</strong>
        <p>Yes. Engg-Tech undertakes both small-scale and medium-scale projects, including short-term installation and maintenance works.</p>
      </div>

      <div class="faq-item">
        <strong>Is Engg-Tech licensed and experienced?</strong>
        <p>Engg-Tech works with experienced technicians and follows industry standards for safety and quality.</p>
      </div>

      <div class="faq-item">
        <strong>Who typically engages Engg-Tech?</strong>
        <p>Our clients include renovation contractors, interior designers, SMEs, property managers, and facility teams.</p>
      </div>

      <div class="faq-item">
        <strong>How can I contact Engg-Tech?</strong>
        <p>Email <a href="mailto:info@engg-tech.com">info@engg-tech.com</a> for enquiries.</p>
      </div>
    </section>
  `;

  /* ==============================
     INSERT BLOCK
  ============================== */
  const placeholder = document.getElementById("recommended-posts");
  if (placeholder) {
    placeholder.insertAdjacentHTML("beforeend", blockHTML);
  } else {
    document.body.insertAdjacentHTML("beforeend", blockHTML);
  }

  /* ==============================
     FETCH BLOG INDEX & BUILD LINKS
  ============================== */
  (async () => {
    try {
      const res = await fetch(blogBase);
      if (!res.ok) return;

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const posts = [...doc.querySelectorAll(`a[href^='${blogLinkMatch}']`)]
        .map(a => ({
          title: a.textContent.trim(),
          url: a.href.replace(/\/$/, "")
        }))
        .filter(p => p.title.length > 0);

      const currentURL = location.href.replace(/\/$/, "");

      const unique = posts.filter(
        (p, i, self) =>
          p.url !== currentURL &&
          i === self.findIndex(t => t.url === p.url)
      );

      const selected = unique
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const box = document.getElementById("recommendedContainer");
      if (!box) return;

      selected.forEach(p => {
        box.insertAdjacentHTML(
          "beforeend",
          `<a class="reco-post-link" href="${p.url}">${p.title}</a>`
        );
      });

    } catch (err) {
      console.error("Engg-Tech Recommended Articles Error:", err);
    }
  })();

});
</script>
