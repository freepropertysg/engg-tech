document.addEventListener("DOMContentLoaded", () => {

  const footerHTML = `
<footer class="enggtech-footer">

  <div class="footer-inner">

    <!-- Stay Connected -->
    <div class="footer-column">
      <h2 class="footer-heading">Stay Connected</h2>
      <p>Follow us for company updates, fire safety tips, and the latest projects in Singapore.</p>
      <p>
  <a href="https://linkedin.com/company/enggtechofficial" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
  <a href="https://facebook.com/enggtech" target="_blank" rel="noopener noreferrer">Facebook</a> |
  <a href="https://instagram.com/enggtechofficial" target="_blank" rel="noopener noreferrer">Instagram</a> |
  <a href="https://youtube.com/@enggtechofficial" target="_blank" rel="noopener noreferrer">YouTube</a>
      </p>
    </div>

    <!-- Explore Blog -->
    <div class="footer-column">
      <h2 class="footer-heading">Explore Our Blog</h2>
      <p>
        Practical fire safety tips, M&E guides, renovation insights, and industry knowledge
        written for Singapore homes and businesses.
      </p>
      <p>
        <a class="footer-blog-link"
           href="https://engg-tech.com/sg/blog/"
           title="Engg-Tech Singapore fire protection and M&E blog">
          Read Our Latest Articles →
        </a>
      </p>
    </div>

    <!-- Contact -->
    <div class="footer-column">
      <h2 class="footer-heading">Contact Us</h2>
      <p>Email us today for trusted support in Singapore</p>
      <p><a href="mailto:info@engg-tech.com">info@engg-tech.com</a></p>
      <a class="footer-btn" href="https://engg-tech.com/contact-us/">
        Request with Online Form
      </a>
    </div>

  </div>

  <hr class="footer-divider">

  <div class="footer-bottom">

    <p>
      © 2015–<span id="copyYear"></span> Engg-Tech Construction Pte. Ltd. All rights reserved. |
      <a href="https://engg-tech.com/privacy-policy/">Privacy Policy</a>
    </p>

    <p>
      Designed &amp; Maintained by
      <a href="https://engg-tech.com/">Engg-Tech Singapore</a>
    </p>

    <p><em id="lastUpdated"></em></p>

    <small class="disclaimer">Disclaimer: This page may contain sponsored ads.</small>

  </div>

  <!-- Auto-Year + Last Updated Script -->
  <script data-exec>
  (function() {
    const now = new Date();
    const year = now.getFullYear();

    const copyEl = document.getElementById("copyYear");
    if (copyEl) copyEl.textContent = year;

    const months = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];

    const formattedDate = \`\${months[now.getMonth()]} \${year}\`;

    const updatedEl = document.getElementById("lastUpdated");
    if (updatedEl) updatedEl.textContent = \`Last updated: \${formattedDate}\`;
  })();
  </script>

  <!-- Force dynamic execution -->
  <img alt="" style="display:none"
    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
    onload="document.querySelectorAll('script[data-exec]:not([data-ran])').forEach(s=>{
      let n=document.createElement('script');
      n.text=s.textContent;
      document.body.appendChild(n);
      s.dataset.ran=1;
    });">

</footer>
`;

  document.getElementById("site-footer").innerHTML = footerHTML;

});
