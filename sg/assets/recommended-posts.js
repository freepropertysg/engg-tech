document.addEventListener("DOMContentLoaded", () => {

  // Only activate on Engg-Tech SG pages
  if (window.location.hostname !== "engg-tech.com") return;
  if (!window.location.pathname.startsWith("/sg")) return;

  /* ---------------------------------------
     1. Inject CSS dynamically
  ---------------------------------------- */
  const css = `
    .recommended-posts-section,
    .faq-section {
      margin-top: 2rem;
      margin-bottom: 2rem;
      padding: 0 !important;
    }

    .recommended-posts-section h2,
    .faq-section h2 {
      font-size: 1.6rem;
      margin-bottom: 1rem;
      color: #212529;
      font-weight: 700;
    }

    .recommended-posts-container {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .reco-post-link {
      text-decoration: none;
      color: #000;
      padding: 0.2rem 0;
      display: block;
      transition: color 0.2s ease;
    }

    .reco-post-link:hover {
      color: #ff6a00;
    }

    .faq-item {
      margin-bottom: 1.2rem;
    }

    .faq-item strong {
      display: block;
      margin-bottom: 0.3rem;
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  /* ---------------------------------------
     2. Recommended Services HTML
  ---------------------------------------- */
  const recommendedHTML = `
    <section class="recommended-posts-section">
      <h2>Related Services</h2>
      <div id="recommendedContainer" class="recommended-posts-container"></div>
    </section>
  `;

  /* ---------------------------------------
     3. FAQ HTML (SERVICE-BASED, SEO SAFE)
  ---------------------------------------- */
  const faqHTML = `
    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <strong>What fire protection systems do you provide?</strong>
        <p>We provide fire sprinkler systems, fire alarm systems, hose reels, wet and dry risers, fire hydrants, and clean agent suppression systems such as FM-200 and Novec.</p>
      </div>

      <div class="faq-item">
        <strong>Do you handle both mechanical and electrical works?</strong>
        <p>Yes. Our M&E services cover electrical distribution, HVAC systems, mechanical ventilation, plumbing, and integrated system coordination.</p>
      </div>

      <div class="faq-item">
        <strong>What types of construction projects do you undertake?</strong>
        <p>We undertake general construction works including civil works, structural framing, roofing, finishing, waterproofing, and coordination works.</p>
      </div>

      <div class="faq-item">
        <strong>What renovation services are available?</strong>
        <p>Our renovation services include flooring, tiling, ceiling works, carpentry, partitions, painting, and interior space optimisation.</p>
      </div>

      <div class="faq-item">
        <strong>Do you provide electrician and plumbing services?</strong>
        <p>Yes. We provide licensed electrical works such as rewiring, power point installation, lighting setup, as well as plumbing services including pipe installation, sanitary fitting, and leak repairs.</p>
      </div>

      <div class="faq-item">
        <strong>Do you offer IT and digital services for businesses?</strong>
        <p>We provide IT support and web services for SMEs, including network setup, email configuration, cybersecurity support, and custom website development.</p>
      </div>

      <div class="faq-item">
        <strong>Do you support business incorporation and consulting?</strong>
        <p>Yes. Our services include Singapore company incorporation, licensing support, compliance advisory, and business consulting for local and foreign enterprises.</p>
      </div>
    </section>
  `;

  /* ---------------------------------------
     4. Insert Recommended + FAQ
  ---------------------------------------- */
  const placeholder = document.getElementById("recommended-posts");

  if (placeholder) {
    placeholder.insertAdjacentHTML("beforeend", recommendedHTML + faqHTML);
  } else {
    const footer = document.querySelector("#site-footer");
    if (footer) {
      footer.insertAdjacentHTML("beforebegin", recommendedHTML + faqHTML);
    } else {
      document.body.insertAdjacentHTML("beforeend", recommendedHTML + faqHTML);
    }
  }

  /* ---------------------------------------
     5. Generate Recommended Services (STATIC)
  ---------------------------------------- */
  const services = [
    { title: "Fire Protection Systems", url: "https://engg-tech.com/sg/services/#fire-protection" },
    { title: "M&E Contracting Services", url: "https://engg-tech.com/sg/services/#me" },
    { title: "General Construction Works", url: "https://engg-tech.com/sg/services/#construction" },
    { title: "Renovation Services", url: "https://engg-tech.com/sg/services/#renovation" },
    { title: "Electrical & Plumbing Services", url: "https://engg-tech.com/sg/services/#electrical-plumbing" },
    { title: "IT Support & Web Services for SMEs", url: "https://engg-tech.com/sg/services/#it-services" },
    { title: "Business Incorporation & Consulting", url: "https://engg-tech.com/sg/services/#business-consulting" }
  ];

  const selected = services.sort(() => Math.random() - 0.5).slice(0, 3);
  const box = document.getElementById("recommendedContainer");
  if (!box) return;

  selected.forEach(item => {
    box.insertAdjacentHTML(
      "beforeend",
      `<a href="${item.url}" class="reco-post-link">${item.title}</a>`
    );
  });

});
