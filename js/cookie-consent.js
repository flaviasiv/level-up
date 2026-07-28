(function () {
  "use strict";

  var STORAGE_KEY = "cookieConsent";

  if (localStorage.getItem(STORAGE_KEY)) return;

  var currentScript = document.currentScript;
  var policyHref = currentScript && currentScript.getAttribute("data-policy-href");

  var style = document.createElement("style");
  style.textContent =
    "#cookie-consent-banner{position:fixed;left:0;right:0;bottom:0;z-index:99999;" +
    "background:#1a1a1a;color:#f2f2f2;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;" +
    "font-size:14px;line-height:1.5;padding:16px 20px;display:flex;flex-wrap:wrap;" +
    "align-items:center;justify-content:center;gap:16px;box-shadow:0 -2px 10px rgba(0,0,0,.25);}" +
    "#cookie-consent-banner p{margin:0;flex:1 1 auto;max-width:640px;height:auto!important;min-height:0!important;line-height:1.5!important;}" +
    "#cookie-consent-banner a{color:#f2f2f2;text-decoration:underline;}" +
    "#cookie-consent-banner .cc-actions{display:flex;gap:10px;flex:0 0 auto;height:auto!important;}" +
    "#cookie-consent-banner button{cursor:pointer;border:none;border-radius:4px;" +
    "padding:10px 18px;font-size:14px;font-weight:600;font-family:inherit;line-height:1.4!important;" +
    "height:auto!important;min-height:0!important;width:auto;}" +
    "#cookie-consent-banner .cc-accept{background:#4caf50;color:#fff;}" +
    "#cookie-consent-banner .cc-accept:hover{background:#43a047;}" +
    "@media (max-width:768px){#cookie-consent-banner{flex-direction:column;align-items:stretch;text-align:center;}" +
    "#cookie-consent-banner .cc-actions{justify-content:center;}" +
    "#cookie-consent-banner .cc-accept{width:100%;padding:12px 18px;}}";
  document.head.appendChild(style);

  var banner = document.createElement("div");
  banner.id = "cookie-consent-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Aviso de cookies");
  var text = policyHref
    ? 'Usamos cookies para melhorar sua experiência neste site. Ao continuar navegando, você concorda com nossa <a href="' + policyHref + '">Política de Cookies</a>.'
    : 'Usamos cookies para melhorar sua experiência neste site. Ao continuar navegando, você concorda com o uso de cookies.';
  banner.innerHTML =
    '<p>' + text + '</p>' +
    '<div class="cc-actions"><button type="button" class="cc-accept">Aceitar</button></div>';

  document.body.appendChild(banner);

  banner.querySelector(".cc-accept").addEventListener("click", function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ status: "accepted", date: new Date().toISOString() }));
    banner.remove();
  });
})();
