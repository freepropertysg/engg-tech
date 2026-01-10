/**********************
 * GOOGLE ANALYTICS
 **********************/

// Load Google Analytics library
const gaScript = document.createElement("script");
gaScript.async = true;
gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-F3P37PXXYN";
document.head.appendChild(gaScript);

// Initialize Analytics after load
gaScript.onload = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }

  gtag('js', new Date());
  gtag('config', 'G-F3P37PXXYN');
};

/**********************
 * GOOGLE ADSENSE
 **********************/

// Load AdSense library
const adsenseScript = document.createElement("script");
adsenseScript.async = true;
adsenseScript.src =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9719299059942736";
adsenseScript.crossOrigin = "anonymous";
document.head.appendChild(adsenseScript);

// Inject AdSense ad after script loads
adsenseScript.onload = () => {
  const adContainer = document.getElementById("site-ad");
  if (!adContainer) return;

  adContainer.innerHTML = `
    <ins class="adsbygoogle"
         style="display:block; text-align:center;"
         data-ad-client="ca-pub-9719299059942736"
         data-ad-slot="YOUR_SLOT_ID"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  `;

  try {
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.warn("AdSense push failed:", e);
  }
};