(() => {
"use strict";

/* ---------------- Product data ---------------- */
const FORMS = {H:"Liquid-filled vegan (HPMC) capsule",G:"Liquid-filled hard gelatin capsule","G/H":"Liquid-filled capsule",P:"Powder-filled capsule",W:"Powder",D:"Liquid (oil blend)",M:"Combi pack (2 capsules)"};
const CATS = [
  ["Digestion","#6b8e23","🌿"],["Women","#d6477f","🌸"],["Men","#2f6fb5","💪"],["Heart","#d9433f","❤️"],
  ["Joints & Bones","#b87a2b","🦴"],["Immunity","#2e9b6f","🛡️"],["Eyes & Brain","#3a8fd1","👁️"],
  ["Skin & Hair","#d9971a","✨"],["Liver & Kidney","#2f9a80","💧"],["Vitamins","#ef7f1a","☀️"]
];
const CAT = Object.fromEntries(CATS.map(([n,c,i]) => [n,{color:c,icon:i}]));
const MAP = {Gut:"Digestion",Women:"Women",Men:"Men",Heart:"Heart",Joint:"Joints & Bones",Immunity:"Immunity",Eye:"Eyes & Brain",Skin:"Skin & Hair",Liver:"Liver & Kidney",Vitamins:"Vitamins"};
const RAW = [
["Neemint","Gut","Neem oil 350 mg + Peppermint oil 150 mg (enteric coated)","H","Gut comfort: bloating, constipation and cramping relief","2 capsules on an empty stomach","15-person open-label study: IBS symptom score improved about 65% in 4 weeks."],
["BC Caps","Women","Neem oil 500 mg (vaginal capsule)","G","Vaginal health and normal discharge","2 capsules intravaginally at bedtime for 14 days","15-woman open-label study: 93% had normal discharge by day 14."],
["Grace Spas","Women","Hing oil 15 mg in frankincense + coconut oil","H","Menstrual cramps, abdominal spasm, indigestion","1 capsule twice daily with food","15-person open-label studies: pain scores fell clearly over 3 cycles."],
["P-Grace","Men","Pumpkin seed oil 320 mg","H","Prostate and heart health; overactive bladder"],
["Astagrace","Skin","Astaxanthin 4 mg, Vit E 10 mg, Vit D 600 IU, Vit A 840 mcg","H","Antioxidant for skin, anti-aging, eyes"],
["Eye 5","Eye","Lutein 10, Zeaxanthin 2, Lycopene 10, Algal DHA 250 mg, Vit A 840 mcg, pumpkin seed oil 80 mg, flaxseed oil, Vit E","H","Complete eye care and antioxidant support"],
["Grace Hep","Liver","Silymarin oil 200 + Turmeric oil 296 + Black pepper oil 2 mg","H","Liver health, detox and digestion"],
["Reno Grace","Liver","Lemon oil 5 + Coriander oil 25 mg","H","Kidney and urinary health; bloating relief"],
["O-Nigella","Immunity","Black seed oil 480 + Oregano oil 20 mg","H","Immune defence, respiratory and gut health"],
["Lyco Grace","Men","Lycopene 10% 100 mg + Vit E 10 mg + Moringa seed oil 390 mg","H","Prostate health and bladder support"],
["Grace Shallaki","Joint","Frankincense oil 150 + Coconut oil 350 mg","H","Joint flexibility, lubrication and mobility"],
["Colla-Grace","Joint","Hydrolyzed collagen peptides (bovine + marine), Vit C, Biotin","W","Bone, joint, skin, hair and nails"],
["Artho-Grace","Joint","Glucosamine HCl 300 + Chondroitin 150 + MSM 150 mg","P","Overall joint health"],
["Cordy+","Immunity","Cordyceps militaris 250 mg","P","Antioxidant, immunity and energy"],
["Gandha D3","Joint","Gandha tailam + Vitamin D3 600 IU","H","Bone and joint support"],
["Vitamin D3 + K2","Vitamins","D3 (lichen) 600 IU + K2 (MK7) 55 mcg + coconut oil 499 mg","H","Bone health and overall wellness"],
["Grace Nigella","Immunity","Black seed oil 500 mg","H","Respiratory, joint, hair and general wellness"],
["Grace Flax","Heart","Flax seed oil 500 mg","G/H","Omega fatty acids for heart, skin and stress"],
["Garlicure","Heart","Garlic oil 0.5% 500 mg in coconut oil","H","Heart health, immunity and digestion"],
["Complete Turmeric","Immunity","Turmeric oil 450 mg + Curcumin 50 mg","H","Immunity, antioxidant, anti-inflammatory"],
["Complete Moringa","Immunity","Moringa seed oil 500 mg (liquid capsule) + Moringa leaf extract 500 mg (powder capsule)","M","Immunity, cholesterol, sugar and weight management"],
["Grace DHA","Eye","Algal (vegetarian) DHA 40% 500 mg","H","Brain and eye health"],
["Grace SBT","Skin","Sea buckthorn oil 500 mg","H","Omega 3, 6, 7, 9 for skin, heart and joints"],
["Toco Flax","Heart","Mixed palm tocotrienol 20 mg + Flaxseed oil 480 mg","G/H","Heart health, stress and metabolic support"],
["Grace Health","Women","Fenugreek oil 500 mg","H","Menstrual and lactation support, menopause"],
["O3 FA","Heart","Fish oil (EPA:DHA 18:12) 500 mg","G","Heart, brain and immunity"],
["O3 Q","Heart","Fish oil 450 mg + CoQ10 30 mg","G","Heart, brain, eye and fertility support"],
["Grace Krill Oil","Heart","Krill oil 500 mg","G","Heart, joints and PMS support"],
["EP Zen","Women","Evening primrose oil 500 mg","G/H","PMS, skin and hair health"],
["Grace Castor","Gut","Castor oil 500 mg","H","Constipation and joint comfort"],
["Grace Neem","Skin","Neem seed oil 500 mg","H","Skin health, anti-dandruff, immunity"],
["Grace Coconut","Skin","Coconut oil 500 mg","H","Quick energy and skin health"],
["Grace Almonds","Skin","Almond oil 500 mg","H","Heart, memory, hair and brain"],
["Grace WG","Skin","Wheat germ oil 500 mg","G/H","Antioxidant, skin and heart"],
["Grace Skin","Skin","Almond, Black seed, Coconut, Sea buckthorn, Neem, Turmeric, Vit E oils (60 ml, external use)","D","Antibacterial care; wound healing"],
["Grace Breatheasy","Immunity","Turmeric, Camphor, Eucalyptus, Tulsi, Oregano, Rosemary oils (50 ml)","D","Respiratory comfort and decongestion"],
["Veg EPA+DHA","Heart","Algal oil EPA:DHA 15:40, 500 mg (enteric coated)","H","Brain, heart and eye health"],
["Grace A2 Ghee","Gut","A2 ghee 500 mg","H","Digestive support and heart wellness"],
["Alphinox","Men","Capsule 1: Ubiquinol 100 + Resveratrol 50 + Astaxanthin 0.8 mg. Capsule 2: Ashwagandha KSM-66 200 + Safed musli 100 + Tribulus 100 + Zinc 5 mg","M","Men's vitality, stamina and sperm health"]
];
const PRODUCTS = RAW.map(a => ({
  name:a[0], cat:MAP[a[1]], comp:a[2], form:a[3], use:a[4],
  dose:a[5] || "As directed by your healthcare practitioner", study:a[6] || "",
  id:a[0].toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")
}));
const BY_ID = Object.fromEntries(PRODUCTS.map(p => [p.id,p]));
const FEATURED = ["neemint","eye-5","complete-turmeric","colla-grace","alphinox","vitamin-d3-k2"];
const SHOP_URL = "https://www.nutragrace.com/";
const CART_URL = "https://www.nutracart.com/";
const buyUrl = p => CART_URL + "search?q=" + encodeURIComponent(p.name);
const buyBtn = (p, cls="btn") => `<a class="${cls}" href="${buyUrl(p)}" target="_blank" rel="noopener">🛍️ Order on NutraCart ↗</a>`;

/* ---------------- Helpers ---------------- */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const store = {
  get(k,d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
const img = (p, cls="") => `<img src="/img/${p.id}.jpg" alt="${esc(p.name)} – NutraGrace" loading="lazy" decoding="async" class="${cls}">`;
const tagStyle = p => `style="--ac:${CAT[p.cat].color}"`;
const isVegan = p => p.form === "H";

let toastTimer;
function toast(msg){
  $("toastMsg").textContent = msg;
  $("toast").hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 2200);
}
function hideToast(){ $("toast").hidden = true; }

/* ---------------- Views ---------------- */
function tile(p){
  return `<div class="tile">
    <a href="#/p/${p.id}" class="ph" aria-label="${esc(p.name)} details">${img(p)}</a>
    <a href="#/p/${p.id}" class="tx" style="text-decoration:none">
      <span class="tag" ${tagStyle(p)}>${esc(p.cat)}</span>
      <h4>${esc(p.name)}</h4>
      <p>${esc(p.use)}</p>
    </a>
    ${buyBtn(p, "btn add")}
  </div>`;
}

function vHome(){
  return `
  <section class="hero" style="background-image:url(/img/hero.jpg)">
    <div class="hero-in">
      <h2>Pure oils. Gentle capsules.</h2>
      <p>India's first liquid-filled capsule maker · Since 2010</p>
      <a href="#/products" class="btn gold">See all ${PRODUCTS.length} products →</a>
    </div>
  </section>
  <div class="section-head"><h3>Shop by need</h3></div>
  <div class="cats">${CATS.map(([n]) => `
    <a class="cat" href="#/products/${encodeURIComponent(n)}" style="--ac:${CAT[n].color}"><i>${CAT[n].icon}</i>
      <span>${esc(n)}<small>${PRODUCTS.filter(p => p.cat === n).length} products</small></span></a>`).join("")}
  </div>
  <div class="section-head"><h3>Popular picks</h3><a href="#/products">View all →</a></div>
  <div class="grid">${FEATURED.map(id => tile(BY_ID[id])).join("")}</div>
  <div class="card">
    <h3>Why liquid-filled capsules?</h3>
    <p class="muted">No plasticisers, preservatives, glycerol or propylene glycol. Very low moisture, more stable and faster to dissolve than soft-gels. Our HPMC shells are 100% plant-based.</p>
  </div>
  <a class="card biz-teaser" href="#/about" style="display:block;text-decoration:none;color:inherit">
    <h3>🌍 Present in 20+ countries</h3>
    <p class="muted">Exports, custom formulation &amp; private-label manufacturing for your brand. Tap to learn more →</p>
  </a>`;
}

let query = "";
function vProducts(cat){
  return `
  <h2 class="page-title">${cat ? esc(cat) : "All products"}</h2>
  <input class="search" id="search" type="search" placeholder="Search by name, ingredient or need…" value="${esc(query)}" aria-label="Search products">
  <div class="filters" role="group" aria-label="Filter by category">
    <a class="chip ${cat ? "" : "on"}" href="#/products" style="text-decoration:none">All</a>
    ${CATS.map(([n]) => `<a class="chip ${cat === n ? "on" : ""}" href="#/products/${encodeURIComponent(n)}" style="text-decoration:none">${CAT[n].icon} ${esc(n)}</a>`).join("")}
  </div>
  <div id="results"></div>`;
}
function renderResults(cat){
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(p => (!cat || p.cat === cat) && (!q || (p.name+" "+p.comp+" "+p.use+" "+p.cat).toLowerCase().includes(q)));
  $("results").innerHTML = list.length
    ? `<p class="muted" style="margin:4px 2px 10px">${list.length} product${list.length > 1 ? "s" : ""}</p><div class="grid">${list.map(tile).join("")}</div>`
    : `<div class="card empty"><h3>No match found</h3><p class="muted">Try another word, or clear the search.</p><button class="btn" type="button" data-clear>Clear search</button></div>`;
}

function vProduct(p){
  if (!p) return `<div class="card empty"><h3>Product not found</h3><a class="btn" href="#/products">See all products</a></div>`;
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0,4);
  return `
  <article class="detail view-in">
    <div class="gallery">${img(p)}</div>
    <div>
      <span class="tag" ${tagStyle(p)}>${CAT[p.cat].icon} ${esc(p.cat)}</span>
      <h1>${esc(p.name)}</h1>
      <div class="pills">
        <span class="pill">${esc(FORMS[p.form])}</span>
        ${isVegan(p) ? `<span class="pill">🌱 Vegan capsule</span>` : ""}
        <span class="pill">✔ FSSAI · GMP · ISO 22000</span>
      </div>
      <div class="info">
        <div><h5>What it's for</h5><p>${esc(p.use)}</p></div>
        <div><h5>What's inside (per serving)</h5><p>${esc(p.comp)}</p></div>
        <div><h5>How to take</h5><p>${esc(p.dose)}</p></div>
        <div><h5>Product type</h5><p>${esc(FORMS[p.form])}${isVegan(p) ? " — plant-based shell, suitable for vegetarians" : ""}</p></div>
        ${p.study ? `<div><h5>Study summary</h5><p>${esc(p.study)}</p><p class="fine" style="margin-top:4px">Small study without a control group. Individual results may vary.</p></div>` : ""}
        <div><h5>Price</h5><p>See the latest price on NutraCart.</p></div>
      </div>
      <div class="links">
        ${buyBtn(p)}
        <a class="btn ghost" href="${SHOP_URL}" target="_blank" rel="noopener">Official site ↗</a>
        <button class="btn ghost" type="button" data-share="${p.id}">📤 Share</button>
      </div>
      <p class="fine">Orders are placed on NutraCart, NutraGrace's official online store.</p>
      <p class="note">Dietary supplement — not a medicine, and not intended to diagnose, treat or cure any disease. Consult your doctor before use, especially if pregnant, nursing or taking medication.</p>
    </div>
  </article>
  ${related.length ? `<div class="section-head"><h3>More for ${esc(p.cat)}</h3></div><div class="grid">${related.map(tile).join("")}</div>` : ""}`;
}

function vAbout(){
  return `
  <section class="hero" style="background-image:url(/img/hero.jpg);min-height:170px"><div class="hero-in"><h2>About NutraGrace</h2><p>Hyderabad, India · since 2010</p></div></section>
  <div class="facts"><div><b>2010</b><small>Founded</small></div><div><b>${PRODUCTS.length}</b><small>Products</small></div><div><b>100%</b><small>Cold-pressed oils</small></div></div>
  <div class="card"><h3>Who we are</h3>
    <p class="muted">A family-run nutraceutical company and India's first liquid-filled capsule manufacturer, with in-house cold-pressed oil extraction.</p>
    <p class="muted">ISO 22000:2018 · GMP · FSSAI Lic. 10020047001547 · Ayush manufacturing licence</p></div>
  <div class="card" id="business"><h3>🌍 Global presence &amp; exports</h3>
    <p class="muted">NutraGrace products and formulations reach customers and partners in <b>20+ countries</b>. Every step — from sourcing raw materials to final packaging — is done in our own Hyderabad facility, built to global quality standards.</p>
    <div class="pills"><span class="pill">✔ WHO GMP</span><span class="pill">✔ ISO 22000</span><span class="pill">✔ GMP-Ayush</span><span class="pill">✔ FSSAI</span></div>
    <p class="fine">Trusted by brands such as INLIFE, Organic India, Sri Sri and Biosash.</p></div>
  <div class="card"><h3>🏭 Custom &amp; private label manufacturing</h3>
    <p class="muted">Want your own nutraceutical or herbal brand? NutraGrace makes products for other companies — from a custom formula to a ready private-label product under your name.</p>
    <ul class="biz">
      <li><b>Custom formulation</b> — we develop a product to your ingredient list or idea.</li>
      <li><b>Private label</b> — choose from our proven formulas and sell them under your brand.</li>
      <li><b>Formats</b> — liquid-filled capsules (India's first LFC maker), powder-filled capsules, tablets, powders and cold-pressed oils.</li>
      <li><b>Export &amp; bulk orders</b> — supply for distributors and partners in India and abroad.</li>
    </ul>
    <div class="row"><a class="btn gold" href="https://wa.me/919030469955?text=${encodeURIComponent("Hello NutraGrace, I'd like to enquire about custom / private label manufacturing.")}" target="_blank" rel="noopener">💬 WhatsApp enquiry</a>
    <a class="btn ghost" href="mailto:sales@nutragrace.com?subject=${encodeURIComponent("Private label / export enquiry")}">✉ sales@nutragrace.com</a></div>
    <p class="fine">Call / WhatsApp: <a href="tel:+919030469955">+91 90304 69955</a></p></div>
  <div class="card"><h3>How to use this app</h3>
    <p class="muted">Everything works with simple taps — no swiping needed. Tap a product to see full details, then tap “Order on NutraCart” to buy it on the official online store. Use the ← button at the top to go back.</p>
    <button class="btn ghost" type="button" data-welcome>Show welcome note again</button></div>
  <div class="card"><h3>Common questions</h3>
    <details><summary>Are all capsules vegan?</summary><p class="muted">Only products tagged “🌱 Vegan capsule” use plant-based HPMC shells.</p></details>
    <details><summary>Can I take them with my medicines?</summary><p class="muted">Please ask your doctor or pharmacist first.</p></details>
    <details><summary>Do you export or make private-label products?</summary><p class="muted">Yes. NutraGrace is present in 20+ countries and offers custom formulation and private-label manufacturing. Message us on WhatsApp or email sales@nutragrace.com.</p></details>
    <details><summary>How do I order and pay?</summary><p class="muted">Tap “Order on NutraCart”. You order and pay on NutraCart, NutraGrace's official online store — not inside this app.</p></details></div>
  <div class="card"><h3>Contact</h3>
    <p class="muted">B-11/7 &amp; 11/8, IDA Uppal, Hyderabad 500039, Telangana, India</p>
    <div class="row"><a class="btn" href="${CART_URL}" target="_blank" rel="noopener">Shop on NutraCart ↗</a><a class="btn ghost" href="${SHOP_URL}" target="_blank" rel="noopener">nutragrace.com ↗</a></div></div>
  <div class="card share-card"><h3>📲 Share &amp; install the app</h3>
    <p class="muted">Send the app to family &amp; friends, or add it to your phone's home screen.</p>
    <div class="row"><button class="btn gold" type="button" data-shareapp>📲 Share app</button>
    ${isStandalone() ? "" : `<button class="btn" type="button" data-install>⬇ Install app</button>`}</div>
    ${isStandalone() ? `<p class="fine">✓ App is installed on this device.</p>` : ""}</div>`;
}

/* ---------------- Router ---------------- */
function parse(){
  const parts = (location.hash.replace(/^#\/?/, "") || "").split("/").map(decodeURIComponent);
  return {page: parts[0] || "home", arg: parts[1] || ""};
}
function render(){
  const {page, arg} = parse();
  const view = $("view");
  $("backBtn").hidden = page === "home";
  const tab = page === "p" ? "products" : page;
  document.querySelectorAll(".tabs a").forEach(a => a.classList.toggle("on", a.dataset.tab === tab));

  let html, title = "NutraGrace";
  switch (page) {
    case "products": { const c = CAT[arg] ? arg : ""; html = vProducts(c); title = (c || "All products") + " – NutraGrace"; break; }
    case "p": { const p = BY_ID[arg]; html = vProduct(p); if (p) title = p.name + " – NutraGrace"; break; }
    case "about": html = vAbout(); title = "About – NutraGrace"; break;
    default: html = vHome();
  }
  view.innerHTML = html;
  document.title = title;
  if (page === "products") {
    renderResults(CAT[arg] ? arg : "");
    $("search").addEventListener("input", e => { query = e.target.value; renderResults(CAT[arg] ? arg : ""); });
  }
}
let stack = [location.hash || "#/"], replacing = false;
window.addEventListener("hashchange", () => {
  const h = location.hash || "#/";
  if (replacing) { stack[stack.length - 1] = h; replacing = false; }
  else if (stack.length > 1 && stack[stack.length - 2] === h) stack.pop();
  else stack.push(h);
  render();
  window.scrollTo({top:0, behavior:"instant"});
});
$("backBtn").addEventListener("click", () => {
  if (stack.length > 1) history.back(); else location.hash = "#/";
});

/* ---------------- Clicks (all tap-based) ---------------- */
document.addEventListener("click", e => {
  const t = e.target.closest("button");
  if (!t) return;
  const d = t.dataset;
  if (d.clear !== undefined) {
    query = ""; $("search").value = ""; renderResults(CAT[parse().arg] ? parse().arg : "");
  } else if (d.share) {
    const p = BY_ID[d.share];
    share(`${p.name} by NutraGrace`, `${p.name}: ${p.use}`, location.origin + "/#/p/" + p.id);
  } else if (d.shareapp !== undefined) {
    openShareSheet();
  } else if (d.closeshare !== undefined) {
    $("shareSheet").hidden = true;
  } else if (d.copylink !== undefined) {
    copyLink(APP_URL);
  } else if (d.nativeshare !== undefined) {
    navigator.share({title: "NutraGrace", text: SHARE_TEXT, url: APP_URL}).catch(() => {});
  } else if (d.welcome !== undefined) {
    showWelcome();
  } else if (d.install !== undefined) {
    installApp();
  } else if (d.closeinstall !== undefined) {
    $("installHelp").hidden = true;
  }
});
$("shareSheet").addEventListener("click", e => { if (e.target.id === "shareSheet") $("shareSheet").hidden = true; });
document.addEventListener("keydown", e => { if (e.key === "Escape") $("shareSheet").hidden = true; });

function share(title, text, url){
  if (navigator.share) navigator.share({title, text, url}).catch(() => {});
  else copyLink(url);
}
function copyLink(url){
  const done = () => toast("Link copied ✓", false);
  const fallback = () => { const i = $("shareUrl"); i.value = url; i.select(); try { document.execCommand("copy"); done(); } catch(e){ toast("Select the link and copy it", false); } };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(url).then(done, fallback);
  else fallback();
}

/* ---------------- Share the app ---------------- */
const APP_URL = location.origin + "/";
const SHARE_TEXT = "Try the NutraGrace app — plant-powered wellness supplements. Open the link to browse and order.\n\nInstall it:\n• iPhone: open in Safari → Share ⬆ → Add to Home Screen\n• Android: open in Chrome → Install app";
function openShareSheet(){
  const msg = SHARE_TEXT + "\n\n" + APP_URL, enc = encodeURIComponent(msg);
  $("shareUrl").value = APP_URL;
  $("shareWa").href = "https://wa.me/?text=" + enc;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  $("shareSms").href = "sms:" + (ios ? "&" : "?") + "body=" + enc;
  $("shareMail").href = "mailto:?subject=" + encodeURIComponent("NutraGrace app") + "&body=" + enc;
  $("shareMore").hidden = !navigator.share;
  $("shareSheet").hidden = false;
}

/* ---------------- Theme & welcome ---------------- */
$("themeBtn").addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("ng_theme", next); } catch(e){}
});
function showWelcome(){ $("welcome").hidden = false; $("wGo").focus(); }
$("wGo").addEventListener("click", () => { $("welcome").hidden = true; store.set("ng_welcomed", true); });
if (!store.get("ng_welcomed", false)) showWelcome();

/* ---------------- Install app ---------------- */
let deferredPrompt = null;
function isStandalone(){ return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; }
function syncInstallUI(){ if (parse().page === "about") render(); }
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredPrompt = e; syncInstallUI(); });
window.addEventListener("appinstalled", () => { deferredPrompt = null; $("installHelp").hidden = true; syncInstallUI(); toast("NutraGrace app installed ✓"); });
async function installApp(){
  if (deferredPrompt) {
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch(e){}
    deferredPrompt = null;
    return;
  }
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  $("installIos").hidden = !ios;
  $("installOther").hidden = ios;
  $("installHelp").hidden = false;
}
/* ---------------- Start ---------------- */
render();
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
})();
