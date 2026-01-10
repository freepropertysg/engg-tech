document.addEventListener("DOMContentLoaded",()=>{

  /* Blog pages only */

  const path = window.location.pathname;

  const countryMatch = path.match(/^\/([a-z]{2})\/blog\//);
  const isRootBlog = path.startsWith("/blog/");

  if(!countryMatch && !isRootBlog) return;

  /* ---------------------------------------
     1. Decide blog base URL
  ---------------------------------------- */
  let blogBase = "/blog/";
  let blogLinkMatch = "/blog/";

  if(countryMatch){
    blogBase = `/${countryMatch[1]}/blog/`;
    blogLinkMatch = `/${countryMatch[1]}/blog/`;
  }

  /* ---------------------------------------
     2. Inject CSS dynamically
  ---------------------------------------- */
  const css=`
    .recommended-posts-section,
    .faq-section{
      margin-top:2rem;
      margin-bottom:2rem;
      padding:0!important;
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
      gap:1.2rem;
    }
    .reco-post-link{
      text-decoration:none;
      color:#000;
      padding:0.2rem 0;
      display:block;
      transition:color 0.2s ease;
    }
    .reco-post-link:hover{color:#2563EB;}
    .faq-item{margin-bottom:1rem;}
    .faq-item strong{
      display:block;
      margin-bottom:0.3rem;
    }
  `;
  const styleTag=document.createElement("style");
  styleTag.textContent=css;
  document.head.appendChild(styleTag);

  /* ---------------------------------------
     3. Recommended Posts HTML
  ---------------------------------------- */
  const recommendedHTML=`
    <section class="recommended-posts-section">
      <h2>Recommended Articles</h2>
      <div id="recommendedContainer" class="recommended-posts-container"></div>
    </section>
  `;

  /* ---------------------------------------
     4. FAQ HTML (ENGG-TECH NEUTRAL)
  ---------------------------------------- */
  const faqHTML=`
    <section class="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div class="faq-item">
        <strong>What services does Engg-Tech provide?</strong>
        <p>Engg-Tech provides fire protection works, M&E services, renovation support, and small-scale installation projects for commercial and industrial spaces.</p>
      </div>

      <div class="faq-item">
        <strong>Do you handle large main-contractor projects?</strong>
        <p>No. Engg-Tech focuses on short-term, small to mid-sized projects that can be completed efficiently without long certification processes.</p>
      </div>

      <div class="faq-item">
        <strong>Do you provide fire alarm and sprinkler installation?</strong>
        <p>Yes. We handle fire alarm systems, sprinkler installations, replacements, and modifications for existing buildings.</p>
      </div>

      <div class="faq-item">
        <strong>Which countries does Engg-Tech operate in?</strong>
        <p>Availability depends on location. Please check your selected country or contact us directly for confirmation.</p>
      </div>

      <div class="faq-item">
        <strong>How can I contact Engg-Tech?</strong>
        <p>You can email us at
        <a href="mailto:info@engg-tech.com">info@engg-tech.com</a>
        for enquiries or project discussions.</p>
      </div>
    </section>
  `;

  /* ---------------------------------------
     5. Insert Recommended + FAQ
  ---------------------------------------- */
  const blockHTML = recommendedHTML + faqHTML;
  const placeholder=document.getElementById("recommended-posts");

  if(placeholder){
    placeholder.insertAdjacentHTML("beforeend",blockHTML);
  }else{
    const footer=document.querySelector("#site-footer");
    if(footer){
      footer.insertAdjacentHTML("beforebegin",blockHTML);
    }else{
      document.body.insertAdjacentHTML("beforeend",blockHTML);
    }
  }

  /* ---------------------------------------
     6. Fetch blog index & generate posts
  ---------------------------------------- */
  (async function(){
    try{
      const res=await fetch(blogBase);
      const html=await res.text();
      const doc=new DOMParser().parseFromString(html,"text/html");

      const posts=[...doc.querySelectorAll(`a[href*='${blogLinkMatch}']`)]
        .map(a=>({
          title:a.textContent.trim(),
          url:a.href.replace(/\/$/,"")
        }))
        .filter(p=>!p.url.endsWith(blogBase.replace(/\/$/,"")));

      const currentURL=window.location.href.replace(/\/$/,"");

      const unique=posts
        .filter(p=>p.url!==currentURL)
        .filter((v,i,self)=>i===self.findIndex(t=>t.url===v.url));

      const selected=unique.sort(()=>Math.random()-0.5).slice(0,3);

      const box=document.getElementById("recommendedContainer");
      if(!box)return;

      selected.forEach(post=>{
        box.insertAdjacentHTML(
          "beforeend",
          `<a href="${post.url}" class="reco-post-link">${post.title}</a>`
        );
      });

    }catch(err){
      console.error("Recommended Posts Error:",err);
    }
  })();

});
