document.addEventListener("DOMContentLoaded",()=>{

const footerHTML=`
<footer style="text-align:center;font-size:0.9rem;">


   <p>
      © 2015–<span id="copyYear"></span> Engg-Tech Construction Pte. Ltd. All rights reserved.
   </p>

  <p style="margin:0.2rem 0;">
  <a href="https://engg-tech.com/about/"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">About</a> |
  <a href="https://engg-tech.com/contact/"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">Contact</a> |
  <a href="https://engg-tech.com/privacy-policy/"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">Privacy Policy</a>
   </p>

  <p style="margin:0.2rem 0;">
  <a href="https://facebook.com/enggtech"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">Facebook</a> |
  <a href="https://instagram.com/enggtechofficial"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">Instagram</a> |
  <a href="https://youtube.com/@enggtechofficial"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">YouTube</a> |
     <a href="https://linkedin.com/company/enggtechofficial"
     target="_blank"
     rel="noopener noreferrer"
     style="text-decoration:none;color:inherit;"
     onmouseover="this.style.color='#ff6a00'"
     onmouseout="this.style.color='inherit'">YouTube</a>
  </p>

  <p style="margin:0.2rem 0;">
    <em id="lastUpdated"></em>

    <script data-exec>
    (function(){
      const now=new Date();
      const year=now.getFullYear();
      const copyEl=document.getElementById("copyYear");
      if(copyEl)copyEl.textContent=year;
      const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
      const formattedDate=now.getDate()+" "+months[now.getMonth()]+" "+year;
      const updatedEl=document.getElementById("lastUpdated");
      if(updatedEl)updatedEl.textContent="Last updated: "+formattedDate;
    })();
    </script>

    <img alt="" style="display:none"
      src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
      onload="document.querySelectorAll('script[data-exec]:not([data-ran])').forEach(s=>{let n=document.createElement('script');n.text=s.textContent;document.body.appendChild(n);s.dataset.ran=1;});">
  </p>
</footer>
`;

document.getElementById("site-footer").innerHTML=footerHTML;

const updatedEl=document.getElementById("lastUpdated");
if(updatedEl){
  const disclaimer=document.createElement("small");
  disclaimer.textContent="Disclaimer: This page may contain sponsored or promotional content.";
  disclaimer.style.display="block";
  disclaimer.style.marginTop="0.2rem";
  updatedEl.insertAdjacentElement("afterend",disclaimer);
}

});
