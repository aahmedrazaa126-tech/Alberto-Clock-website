/* =========================================================
   ALBERTO CLOCK - script.js
   Is file mein website ka poora logic hai: products, cart, pages badalna,
   forms ki checking, offers, feedback aur chat bot.
   ========================================================= */

/* ==========================================================
   1. PRODUCTS DATA
   Naya watch add karne ke liye bas ek line copy karke badlein.
   category = women / men / wall
   img      = photo ka path (images folder mein)
   bestseller:true wale items home page par dikhte hain
   ========================================================== */
const PRODUCTS = [
  // ----- Wall Clocks -----
  { id:1,  name:"Rose Gold Numeral Black Wall Clock", category:"wall",  price:3500, img:IMAGES.wall1,  bestseller:false },
  { id:2,  name:"Black & Gold Pendulum Wall Clock",   category:"wall",  price:6500, img:IMAGES.wall2,  bestseller:true  },
  { id:3,  name:"Wooden Ring Pendulum Wall Clock",    category:"wall",  price:5500, img:IMAGES.wall3,  bestseller:false },
  { id:4,  name:"Navy & Gold Roman Wall Clock",       category:"wall",  price:7500, img:IMAGES.wall4,  bestseller:true  },
  // ----- Women's Watches -----
  { id:5,  name:"Wine Dial Crystal Ladies Watch",     category:"women", price:5500, img:IMAGES.women1, bestseller:true  },
  { id:6,  name:"Pearl Dial Diamond Ladies Watch",    category:"women", price:8500, img:IMAGES.women2, bestseller:true  },
  { id:7,  name:"Emerald Green Rose Gold Watch",      category:"women", price:6500, img:IMAGES.women3, bestseller:false },
  { id:8,  name:"Golden Diamond Ladies Watch",        category:"women", price:9500, img:IMAGES.women4, bestseller:true  },
  { id:9,  name:"Rose Gold Watch & Bracelet Set",     category:"women", price:4500, img:IMAGES.women5, bestseller:false },
  { id:10, name:"Octagon Pearl Strap Ladies Watch",   category:"women", price:3800, img:IMAGES.women6, bestseller:false },
  // ----- Men's Watches -----
  { id:11, name:"Chronograph Steel Men's Watch",      category:"men",   price:9500, img:IMAGES.men1,   bestseller:true  },
  { id:12, name:"Brown Leather Classic Men's Watch",  category:"men",   price:5000, img:IMAGES.men2,   bestseller:false },
  { id:13, name:"Black Dial Leather Rose Gold Watch", category:"men",   price:7500, img:IMAGES.men3,   bestseller:true  },
  { id:14, name:"Green Dial Steel Automatic Watch",   category:"men",   price:8900, img:IMAGES.men4,   bestseller:true  },
  // ----- Extra items (placeholders: same photos, replace img/name/price with your real stock) -----
  { id:15, name:"Rose Gold Numeral Wall Clock II",     category:"wall",  price:3900, img:IMAGES.wall1,  bestseller:false },
  { id:16, name:"Black & Gold Pendulum Wall Clock II", category:"wall",  price:6900, img:IMAGES.wall2,  bestseller:false },
  { id:17, name:"Wooden Ring Pendulum Wall Clock II",  category:"wall",  price:5900, img:IMAGES.wall3,  bestseller:false },
  { id:18, name:"Navy & Gold Roman Wall Clock II",     category:"wall",  price:7900, img:IMAGES.wall4,  bestseller:false },
  { id:19, name:"Classic Gold Pendulum Wall Clock",    category:"wall",  price:7200, img:IMAGES.wall2,  bestseller:false },
  { id:20, name:"Wine Dial Crystal Ladies Watch II",   category:"women", price:5900, img:IMAGES.women1, bestseller:false },
  { id:21, name:"Pearl Dial Diamond Ladies Watch II",  category:"women", price:8900, img:IMAGES.women2, bestseller:false },
  { id:22, name:"Emerald Green Rose Gold Watch II",    category:"women", price:6900, img:IMAGES.women3, bestseller:false },
  { id:23, name:"Chronograph Steel Men's Watch II",    category:"men",   price:9900, img:IMAGES.men1,   bestseller:false },
  { id:24, name:"Brown Leather Classic Men's Watch II",category:"men",   price:5400, img:IMAGES.men2,   bestseller:false },
  { id:25, name:"Black Dial Leather Rose Gold Watch II",category:"men",  price:7900, img:IMAGES.men3,   bestseller:false },
  { id:26, name:"Green Dial Steel Automatic Watch II", category:"men",   price:9300, img:IMAGES.men4,   bestseller:false },
  { id:27, name:"Classic Steel Chronograph Men's Watch",category:"men",  price:8700, img:IMAGES.men1,   bestseller:false }
];

/* ==========================================================
   2. LOGO: clock ke andar "Alberto" likha hua
   Bahar sunehri ring, andar gehra burgundy, beech mein cream dial
   ========================================================== */
function logoTicks() {
  let out = "";
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI) / 6;
    const big = i % 3 === 0;                 // 12, 3, 6, 9 par lambi line
    const r1 = big ? 62 : 68, r2 = 75;
    out += `<line x1="${(100 + Math.sin(a) * r1).toFixed(1)}" y1="${(100 - Math.cos(a) * r1).toFixed(1)}" x2="${(100 + Math.sin(a) * r2).toFixed(1)}" y2="${(100 - Math.cos(a) * r2).toFixed(1)}" stroke="#5a1424" stroke-width="${big ? 3.5 : 2}" stroke-linecap="round"/>`;
  }
  return out;
}

const LOGO_SVG = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Alberto Clock logo">
  <circle cx="100" cy="100" r="98" fill="#d9b56a"/>
  <circle cx="100" cy="100" r="92" fill="#3f0d19"/>
  <circle cx="100" cy="100" r="83" fill="#f7f1e3"/>
  <circle cx="100" cy="100" r="79" fill="none" stroke="#d9b56a" stroke-width="1.5"/>
  ${logoTicks()}
  <line x1="100" y1="100" x2="74" y2="85" stroke="#3f0d19" stroke-width="5" stroke-linecap="round"/>
  <line x1="100" y1="100" x2="140" y2="77" stroke="#3f0d19" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="100" cy="100" r="5" fill="#d9b56a" stroke="#3f0d19" stroke-width="2"/>
  <text x="100" y="130" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="31" font-style="italic" font-weight="bold" fill="#5a1424">Alberto</text>
  <text x="100" y="148" text-anchor="middle" font-family="Georgia,'Times New Roman',serif" font-size="10" letter-spacing="5" fill="#5a1424">CLOCK</text>
</svg>`;

/* Product model and colour details shown in cards, price list and detail lightbox. */
function productModel(p) { return `AC-${String(p.id).padStart(3, "0")}`; }
function productColor(p) {
  const n = p.name.toLowerCase();
  if (n.includes("rose gold")) return "Rose Gold / Black";
  if (n.includes("black") && n.includes("gold")) return "Black & Gold";
  if (n.includes("navy")) return "Navy Blue & Gold";
  if (n.includes("wooden")) return "Natural Wood";
  if (n.includes("wine")) return "Wine / Burgundy";
  if (n.includes("pearl")) return "Pearl / Silver";
  if (n.includes("emerald") || n.includes("green")) return "Emerald Green";
  if (n.includes("golden") || n.includes("gold")) return "Gold";
  if (n.includes("brown")) return "Brown Leather";
  if (n.includes("black")) return "Black";
  if (n.includes("steel")) return "Silver / Stainless Steel";
  return "As shown in product image";
}
function productCategoryLabel(p) {
  return p.category === "wall" ? "Wall Clock" : p.category === "women" ? "Women's Watch" : "Men's Watch";
}
function renderPriceList() {
  const body = $("#price-list-body");
  if (!body) return;
  const q = ($("#price-search")?.value || "").trim().toLowerCase();
  const cat = $("#price-category")?.value || "all";
  const list = PRODUCTS.filter(p => (cat === "all" || p.category === cat) &&
    `${p.name} ${productModel(p)} ${productCategoryLabel(p)}`.toLowerCase().includes(q));
  body.innerHTML = list.map(p => `<tr><td><strong>${productModel(p)}</strong></td><td>${escapeHTML(p.name)}</td><td>${productCategoryLabel(p)}</td><td class="table-price">${pkr(p.price)}</td></tr>`).join("") ||
    `<tr><td colspan="4" class="price-empty">No products match your search.</td></tr>`;
}

/* Product ki photo (sab jagah yahi use hota hai) */
function productArt(p) {
  return `<img src="${p.img}" alt="${p.name}" loading="lazy">`;
}

/* Logo har jagah lagana */
function placeLogos() {
  document.querySelectorAll(".logo-wrap").forEach(el => el.innerHTML = LOGO_SVG);
}

/* ==========================================================
   3. HELPERS
   ========================================================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);
/* Sab prices Pakistani Rupees (PKR) mein dikhte hain */
const pkr = (n) => "PKR " + Math.round(n).toLocaleString("en-US");
const getProduct = (id) => PRODUCTS.find(p => p.id === id);

function showToast(msg) {
  let t = $("#toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 2200);
}

function openPopup(id) { $(id).classList.add("show"); }
function closePopup(id) { $(id).classList.remove("show"); }

/* ==========================================================
   4. CART (browser mein save hota hai)
   ========================================================== */
function getCart() { return JSON.parse(localStorage.getItem("albertoCart") || "[]"); }
function saveCart(c) { localStorage.setItem("albertoCart", JSON.stringify(c)); updateCartCount(); }
function getCoupon() { return localStorage.getItem("albertoCoupon") || ""; }
function setCoupon(code) { code ? localStorage.setItem("albertoCoupon", code) : localStorage.removeItem("albertoCoupon"); }

function addToCart(id, qty = 1) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) item.qty += qty; else cart.push({ id, qty });
  saveCart(cart);
  showToast("Item added to your cart");
}

function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(cart);
}

function removeFromCart(id) { saveCart(getCart().filter(i => i.id !== id)); }
function clearCart() { saveCart([]); }

function buyNow(id) {
  clearCart();
  addToCart(id, 1);
  goTo("cart");
}

function updateCartCount() {
  const n = getCart().reduce((s, i) => s + i.qty, 0);
  $("#cart-count").textContent = n;
  $("#cart-count").classList.toggle("zero", n === 0);
}

/* Discount calculation: BOGO, HALF50, OFF30 */
const COUPONS = {
  BOGO:   { label: "Buy 1 Get 1", apply: (items) => items.reduce((s, i) => s + i.price * Math.ceil(i.qty / 2), 0) },
  HALF50: { label: "50% OFF",     apply: (items) => items.reduce((s, i) => s + i.price * i.qty, 0) * 0.5 },
  OFF30:  { label: "30% OFF",     apply: (items) => items.reduce((s, i) => s + i.price * i.qty, 0) * 0.7 },
  OFF10:  { label: "10% OFF",     apply: (items) => items.reduce((s, i) => s + i.price * i.qty, 0) * 0.9 },
  OFF20:  { label: "20% OFF",     apply: (items) => items.reduce((s, i) => s + i.price * i.qty, 0) * 0.8 },
  OFF40:  { label: "40% OFF",     apply: (items) => items.reduce((s, i) => s + i.price * i.qty, 0) * 0.6 }
};

function cartTotals() {
  const items = getCart().map(i => ({ ...getProduct(i.id), qty: i.qty })).filter(i => i.name);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const code = getCoupon();
  const total = code && COUPONS[code] ? COUPONS[code].apply(items) : subtotal;
  return { items, subtotal, total, code };
}

/* ==========================================================
   5. RENDER: PRODUCT CARD
   ========================================================== */
/* Mix categories so every view shows a balanced set */
function spread(list) {
  const g = {};
  list.forEach(p => (g[p.category] = g[p.category] || []).push(p));
  const keys = Object.keys(g), out = [];
  for (let i = 0; out.length < list.length; i++) keys.forEach(k => { if (g[k][i]) out.push(g[k][i]); });
  return out;
}

/* Wishlist (saved in the browser) */
function getWish() { return JSON.parse(localStorage.getItem("albertoWishlist") || "[]"); }
function updateWishCount() {
  const n = getWish().length;
  $("#wish-count").textContent = n;
  $("#wish-count").classList.toggle("zero", n === 0);
}
function renderWishlists() {
  const list = getWish().map(getProduct).filter(Boolean);
  $("#home-wish").innerHTML = list.map(cardHTML).join("");
  $("#home-wish-sec").style.display = list.length ? "" : "none";
  $("#wishlist-grid").innerHTML = list.length ? list.map(cardHTML).join("") :
    `<p class="empty-msg" style="grid-column:1/-1">Your wishlist is empty. Tap the \u{1F90D} on any item to save it here.<br><br><a href="collection.html" class="btn btn-small" data-go="collection">Browse Collection</a></p>`;
}
function toggleWish(id) {
  let w = getWish();
  const was = w.includes(id);
  w = was ? w.filter(x => x !== id) : [id, ...w];
  localStorage.setItem("albertoWishlist", JSON.stringify(w));
  $$(`[data-wish="${id}"]`).forEach(b => { b.classList.toggle("on", !was); b.textContent = was ? "\u{1F90D}" : "\u2764\uFE0F"; });
  updateWishCount();
  renderWishlists();
  showToast(was ? "Removed from wishlist" : "Added to wishlist \u2764\uFE0F");
}
document.addEventListener("click", (e) => {
  const supportTab = e.target.closest("[data-support-tab]");
  if (supportTab) {
    const key = supportTab.dataset.supportTab;
    $$(".support-tab").forEach(t => { const active = t === supportTab; t.classList.toggle("active", active); t.setAttribute("aria-selected", active ? "true" : "false"); });
    $$("[data-support-panel]").forEach(panel => { const active = panel.dataset.supportPanel === key; panel.classList.toggle("active", active); panel.hidden = !active; });
    return;
  }
  const b = e.target.closest("[data-wish]");
  if (b) toggleWish(+b.dataset.wish);
});

/* Contact form pop-up */
function openContactForm() { $("#contact-modal").classList.add("show"); setTimeout(() => $("#ct-name").focus(), 450); }
function closeContactForm() { $("#contact-modal").classList.remove("show"); }
$("#open-contact-form").addEventListener("click", openContactForm);
$("#support-open-contact").addEventListener("click", openContactForm);
$("#support-warranty-claim").addEventListener("click", () => { openContactForm(); const msg = $("#ct-msg"); if (msg) msg.value = "Warranty Claim\\n\\nProduct / Model: \\nOrder Number: \\nPurchase Date: \\nIssue Details: "; });
$("#close-contact-form").addEventListener("click", closeContactForm);
$("#contact-modal").addEventListener("click", (e) => { if (e.target.id === "contact-modal") closeContactForm(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeContactForm(); });

/* One background video that follows the visitor to every page */
function mountVideo(name) {
  const v = $("#hero-video");
  const host = $("#page-" + name + " .hero") || $("#page-" + name + " .page-banner");
  if (!v || !host) return;
  // Har page ke hero (ya banner) ke andar video ko rakhna
  if (v.parentNode !== host) host.prepend(v);
  v.muted = true;
  v.loop = true;
  v.playsInline = true;
  if (v.paused) {
    const pr = v.play();
    if (pr && pr.catch) pr.catch(() => {});
  }
}

function cardHTML(p) {
  const badge = p.bestseller ? `<span class="badge">Best Seller</span>` : "";
  const wished = getWish().includes(p.id);
  return `
    <article class="product-card" data-category="${p.category}">
      <div class="img-box" data-zoom="${p.id}" role="button" tabindex="0" aria-label="View details for ${p.name}">${productArt(p)}<span class="img-hint">View Details</span></div>
      <button class="wish-btn ${wished ? "on" : ""}" data-wish="${p.id}" aria-label="Wishlist">${wished ? "❤️" : "🤍"}</button>
      <div class="product-body">
        <div class="badge-slot">${badge}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="price">${pkr(p.price)}</p>
        <p class="product-model">Model: ${productModel(p)}</p>
        <div class="card-actions">
          <button class="btn btn-outline btn-small" data-add="${p.id}">Add to Cart</button>
          <button class="btn btn-small" data-buy="${p.id}">Buy Now</button>
        </div>
      </div>
    </article>`;
}

/* ==========================================================
   6. PAGE RENDERERS
   ========================================================== */
let collectionFilter = "all";
let collectionSort = "default";

/* Home page par best sellers sirf photo + naam + price (bina card ke) */
function bestItemHTML(p) {
  return `
    <div class="best-item">
      <img src="${p.img}" alt="${p.name}" data-zoom="${p.id}">
      <h3>${p.name}</h3>
      <p class="price">${pkr(p.price)}</p>
      <button class="btn btn-small" data-add="${p.id}">Add to Cart</button>
    </div>`;
}

function renderHome() {
  $("#best-grid").innerHTML = spread(PRODUCTS.filter(p => p.bestseller)).slice(0, 8).map(cardHTML).join("");
}

function renderCollection() {
  const all = collectionFilter === "all";
  let list = PRODUCTS.filter(p => all || p.category === collectionFilter);
  if (all) list = spread(list);
  if (collectionSort === "high-low") list.sort((a, b) => b.price - a.price);
  if (collectionSort === "low-high") list.sort((a, b) => a.price - b.price);
  $("#collection-grid").className = "products-grid " + (all ? "grid-4" : "grid-3");
  $("#collection-grid").innerHTML = list.slice(0, all ? 20 : 9).map(cardHTML).join("");
}

function renderCart() {
  const { items, subtotal, total, code } = cartTotals();
  const box = $("#cart-items");

  if (!items.length) {
    box.innerHTML = `<p class="empty-msg">Your cart is empty.<br><br><a href="collection.html" class="btn btn-small" data-go="collection">Continue Shopping</a></p>`;
  } else {
    box.innerHTML = items.map(i => `
      <div class="cart-item">
        <div class="thumb">${productArt(i)}</div>
        <div class="cart-item-info">
          <strong>${i.name}</strong>
          <p class="price">${pkr(i.price * i.qty)}</p>
        </div>
        <div class="qty">
          <button data-minus="${i.id}" aria-label="Minus">&minus;</button>
          <span>${i.qty}</span>
          <button data-plus="${i.id}" aria-label="Plus">+</button>
        </div>
        <button class="remove-btn" data-remove="${i.id}" title="Remove" aria-label="Remove">&#128465;</button>
      </div>`).join("");
  }

  $("#cart-total").textContent = pkr(total);
  $("#coupon-msg").innerHTML = code && COUPONS[code]
    ? `<span class="msg-ok">Offer applied: ${COUPONS[code].label}. You save ${pkr(subtotal - total)}</span>`
    : "";
}

function renderGallery() {
  $("#gallery-grid").innerHTML = spread(PRODUCTS).slice(0, 24).map(p => `
    <div class="gallery-item" data-zoom="${p.id}">
      <div class="pic">${productArt(p)}</div>
      <div class="name">${p.name}</div>
    </div>`).join("");
}

function renderReviews() {
  const seed = [
    { name: "Ahmed R.", rating: 5, msg: "A beautiful watch with excellent finishing. The packaging was also very elegant.", date: "2026-09-12" },
    { name: "Sana M.", rating: 5, msg: "The wall clock looks stunning in my living room. Thank you, Alberto Clock!", date: "2026-10-03" },
    { name: "Usman K.", rating: 4, msg: "Great quality and good value. Delivery took a day longer than expected.", date: "2026-10-20" }
  ];
  const saved = JSON.parse(localStorage.getItem("albertoFeedback") || "[]");
  const all = [...saved, ...seed];
  $("#reviews").innerHTML = all.map(r => `
    <div class="review">
      <div class="stars">${"\u2605".repeat(r.rating)}${"\u2606".repeat(5 - r.rating)}</div>
      <p>${escapeHTML(r.msg)}</p>
      <small>- ${escapeHTML(r.name)} | ${r.date}</small>
    </div>`).join("");
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

/* ==========================================================
   7. ROUTING (hash based: #home, #cart, etc.)
   ========================================================== */
let shutterActiveTab = "contact";
function openSupportShutter(tab = "contact") {
  const shutter = $("#support-shutter");
  if (!shutter) return;
  shutterActiveTab = tab;
  $("#support-shutter-backdrop").classList.add("show");
  shutter.classList.add("show");
  shutter.setAttribute("aria-hidden", "false");
  document.body.classList.add("support-shutter-open");
  $$(".shutter-tab").forEach(b => b.classList.toggle("active", b.dataset.shutterTab === tab));
  $$("[data-shutter-panel]").forEach(p => { const active = p.dataset.shutterPanel === tab; p.classList.toggle("active", active); p.hidden = !active; });
}
function closeSupportShutter() {
  $("#support-shutter")?.classList.remove("show");
  $("#support-shutter-backdrop")?.classList.remove("show");
  $("#support-shutter")?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("support-shutter-open");
}
function toggleSupportShutter() {
  if ($("#support-shutter")?.classList.contains("show")) closeSupportShutter();
  else openSupportShutter("contact");
}
$("#support-shutter-close").addEventListener("click", closeSupportShutter);
$("#support-shutter-backdrop").addEventListener("click", closeSupportShutter);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSupportShutter(); });
document.addEventListener("click", e => {
  const tab = e.target.closest("[data-shutter-tab]");
  if (tab) { openSupportShutter(tab.dataset.shutterTab); return; }
  const action = e.target.closest("[data-shutter-open]");
  if (action) {
    const tabName = action.dataset.shutterOpen;
    closeSupportShutter();
    if (currentPageName() !== "support") {
      sessionStorage.setItem("albertoPendingSupportTab", tabName);
      goTo("support");
      return;
    }
    applySupportTab(tabName);
  }
});

function applySupportTab(tabName) {
  setTimeout(() => {
      $$(".support-tab").forEach(t => { const active = t.dataset.supportTab === tabName; t.classList.toggle("active", active); t.setAttribute("aria-selected", active ? "true" : "false"); });
      $$("[data-support-panel]").forEach(p => { const active = p.dataset.supportPanel === tabName; p.classList.toggle("active", active); p.hidden = !active; });
      if (tabName === "warranty") { const msg = $("#ct-msg"); if (msg) msg.value = "Warranty Claim\\n\\nProduct / Model: \\nOrder Number: \\nPurchase Date: \\nIssue Details: "; }
  }, 60);
}

const PAGE_NAMES = ["home","collection","cart","contact","repair","customize","about","support","offers","gallery","stores","wishlist","confirmation","sitemap","technology","price-list"];

/* Page name from the file name (cart.html -> "cart", index.html -> "home") */
function currentPageName() {
  const file = location.pathname.split("/").pop().replace(/\.html?$/i, "");
  return (!file || file === "index") ? "home" : file;
}

function showPage() {
  let name = location.hash.replace("#", "") || currentPageName();
  if (name === "faq") name = "support";
  if (!PAGE_NAMES.includes(name)) name = "home";

  $$(".page").forEach(p => p.classList.remove("active"));
  $("#page-" + name).classList.add("active");
  $$(".nav a, .hdr-icon").forEach(a => a.classList.toggle("active", a.dataset.nav === name));
  window.scrollTo(0, 0);

  if (name === "home") renderHome();
  if (name === "collection") renderCollection();
  if (name === "price-list") renderPriceList();
  if (name === "cart") renderCart();
  if (name === "gallery") renderGallery();
  if (name === "support") renderReviews();
  if (name === "stores") renderStores();
  if (name === "confirmation") renderConfirmation();
  renderWishlists();
  updateWishCount();
  mountVideo(name);
  updateCartCount();
}

/* Instant page navigation: no loader between pages */
function goTo(name) {
  if (name === "faq") name = "support";
  if (name === currentPageName() && !location.hash) return;
  sessionStorage.setItem("albertoPageNavigation", "1");
  location.href = name === "home" ? "index.html" : name + ".html";
}

/* ==========================================================
   8. EVENTS
   ========================================================== */
document.addEventListener("click", (e) => {
  const localLink = e.target.closest('a[href]');
  if (localLink && !localLink.hasAttribute("data-go") && !e.defaultPrevented && e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
    const href = localLink.getAttribute("href");
    if (href && /\.html(?:[#?].*)?$/.test(href)) {
      sessionStorage.setItem("albertoPageNavigation", "1");
    }
  }
  const supportNav = e.target.closest('[data-nav="support"], [data-go="support"]');
  if (supportNav) { e.preventDefault(); toggleSupportShutter(); return; }
  const go = e.target.closest("[data-go]");
  if (go) { e.preventDefault(); goTo(go.dataset.go); return; }

  const add = e.target.closest("[data-add]");
  if (add) { addToCart(+add.dataset.add); return; }

  const buy = e.target.closest("[data-buy]");
  if (buy) { buyNow(+buy.dataset.buy); return; }

  const zoom = e.target.closest("[data-zoom]");
  if (zoom) { openLightbox(+zoom.dataset.zoom); return; }

  const plus = e.target.closest("[data-plus]");
  if (plus) { changeQty(+plus.dataset.plus, 1); renderCart(); return; }

  const minus = e.target.closest("[data-minus]");
  if (minus) { changeQty(+minus.dataset.minus, -1); renderCart(); return; }

  const rem = e.target.closest("[data-remove]");
  if (rem) { removeFromCart(+rem.dataset.remove); renderCart(); return; }

  const claim = e.target.closest(".claim-btn");
  if (claim) {
    const code = claim.dataset.code;
    setCoupon(code);
    $("#claim-msg").textContent = `Offer claimed! Your code is ${code}. Apply it in your cart.`;
    showToast("Offer claimed");
    return;
  }

  const filter = e.target.closest("#filter-tabs button");
  if (filter) {
    $$("#filter-tabs button").forEach(b => b.classList.remove("active"));
    filter.classList.add("active");
    collectionFilter = filter.dataset.filter;
    renderCollection();
  }
});

$("#sort-select").addEventListener("change", (e) => { collectionSort = e.target.value; renderCollection(); });
$("#price-search").addEventListener("input", renderPriceList);
$("#price-category").addEventListener("change", renderPriceList);
window.addEventListener("hashchange", showPage);

/* Lightbox: close with x, outside click or Escape */
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeProductLightbox(); });
/* Lightbox */
let activeDetailProductId = null;
function openLightbox(id) {
  const p = getProduct(id);
  if (!p) return;
  activeDetailProductId = p.id;
  $("#lb-pic").innerHTML = productArt(p);
  $("#lb-name").textContent = p.name;
  $("#lb-price").textContent = pkr(p.price);
  $("#lb-specs").innerHTML = `
    <div><span>Model</span><strong>${productModel(p)}</strong></div>
    <div><span>Category</span><strong>${productCategoryLabel(p)}</strong></div>
    <div><span>Colour</span><strong>${productColor(p)}</strong></div>
    <div><span>Price</span><strong>${pkr(p.price)}</strong></div>`;
  $("#lb-description").textContent = p.category === "wall"
    ? "A decorative wall clock selected to add character and timeless style to your home."
    : "A stylish wristwatch selected for its elegant appearance and everyday versatility.";
  $("#lightbox").classList.add("show");
  document.body.classList.add("modal-open");
}
function closeProductLightbox() {
  $("#lightbox").classList.remove("show");
  document.body.classList.remove("modal-open");
}
$("#lb-add").addEventListener("click", () => { if (activeDetailProductId) { addToCart(activeDetailProductId); closeProductLightbox(); } });
$("#lb-buy").addEventListener("click", () => { if (activeDetailProductId) { const id = activeDetailProductId; closeProductLightbox(); buyNow(id); } });
$("#lb-close").addEventListener("click", closeProductLightbox);
$("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeProductLightbox(); });

/* Coupon apply in cart */
$("#apply-coupon").addEventListener("click", () => {
  const code = $("#coupon-input").value.trim().toUpperCase();
  if (!COUPONS[code]) {
    $("#coupon-msg").innerHTML = `<span class="msg-bad">This code is not valid. Please claim an offer from the Offers page.</span>`;
    return;
  }
  setCoupon(code);
  $("#coupon-input").value = "";
  renderCart();
});

/* Checkout */
function validateCheckout() {
  const name = $("#c-name").value.trim();
  const phone = $("#c-phone").value.trim();
  const address = $("#c-address").value.trim();
  const pin = $("#c-pin").value.trim();
  const checks = {
    "#e-name": name.length < 2,
    "#e-phone": !/^03[0-9]{9}$/.test(phone),
    "#e-address": address.length < 8,
    "#e-pin": !/^[0-9]{5}$/.test(pin)
  };
  let ok = true;
  for (const sel in checks) { $(sel).style.display = checks[sel] ? "block" : "none"; if (checks[sel]) ok = false; }
  return ok;
}

$("#checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!getCart().length) { showToast("Your cart is empty"); return; }
  if (!validateCheckout()) return;
  const { items, subtotal, total, code } = cartTotals();
  const order = {
    id: "AC-" + Date.now().toString(36).toUpperCase(),
    date: new Date().toLocaleString("en-GB"),
    name: $("#c-name").value.trim(), phone: $("#c-phone").value.trim(),
    address: $("#c-address").value.trim(), pin: $("#c-pin").value.trim(),
    items: items.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
    subtotal, total, code
  };
  localStorage.setItem("albertoLastOrder", JSON.stringify(order));
  clearCart();
  setCoupon("");
  $("#checkout-form").reset();
  renderCart();
  goTo("confirmation");
});

/* Order confirmation page + receipt download */
function getLastOrder() { return JSON.parse(localStorage.getItem("albertoLastOrder") || "null"); }

function renderConfirmation() {
  const o = getLastOrder();
  $("#receipt-btn").style.display = o ? "" : "none";
  if (!o) { $("#order-summary").innerHTML = `<p class="empty-msg">No recent order found.</p>`; return; }
  const discount = o.subtotal - o.total;
  $("#order-summary").innerHTML =
    `<p class="order-id">Order ID: <strong>${o.id}</strong></p>` +
    o.items.map(i => `<div class="order-line"><span>${escapeHTML(i.name)} &times; ${i.qty}</span><span>${pkr(i.price * i.qty)}</span></div>`).join("") +
    (discount > 0 ? `<div class="order-line"><span>Discount (${o.code})</span><span>- ${pkr(discount)}</span></div>` : "") +
    `<div class="total-row"><span>Total</span><span>${pkr(o.total)}</span></div>`;
}

$("#receipt-btn").addEventListener("click", () => {
  const o = getLastOrder();
  if (!o) return;
  const lines = ["ALBERTO CLOCK - ORDER RECEIPT", "==============================",
    "Order ID : " + o.id, "Date     : " + o.date, "Name     : " + o.name,
    "Phone    : " + o.phone, "Address  : " + o.address + " (" + o.pin + ")", "", "ITEMS", "------------------------------"];
  o.items.forEach(i => lines.push(i.name + " x " + i.qty + " - " + pkr(i.price * i.qty)));
  lines.push("------------------------------");
  if (o.subtotal > o.total) lines.push("Discount (" + o.code + "): - " + pkr(o.subtotal - o.total));
  lines.push("TOTAL: " + pkr(o.total), "", "Payment: Cash on Delivery", "Thank you for shopping with Alberto Clock!");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/plain" }));
  a.download = "Alberto-Clock-Receipt-" + o.id + ".txt";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  showToast("Receipt downloaded");
});

/* Store locator: edit this list with your real branches */
const BRANCHES = [
  { name: "Main Showroom",  address: "North Karachi, Karachi, Pakistan",     phone: "+92 300 0000000", hours: "Mon to Sat, 10:00 AM to 8:00 PM" },
  { name: "Service Centre",  address: "North Karachi, Karachi, Pakistan", phone: "+92 300 0000001", hours: "Mon to Sat, 11:00 AM to 9:00 PM" },
  { name: "Gallery Outlet",  address: "North Karachi, Karachi, Pakistan",   phone: "+92 300 0000002", hours: "Daily, 12:00 PM to 10:00 PM" }
];

function storeArt(i) {
  const c = [["#5a1424", "#d9b56a"], ["#3f0d19", "#e8cf94"], ["#74243a", "#d9b56a"]][i % 3];
  const win = (x) => `<rect x="${x}" y="84" width="62" height="50" rx="4" fill="#fbf4e4"/><circle cx="${x + 31}" cy="109" r="17" fill="none" stroke="${c[1]}" stroke-width="3"/><path d="M${x + 31} 109V99M${x + 31} 109l8 4" stroke="${c[1]}" stroke-width="2.5" fill="none"/>`;
  return `<svg viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Store front"><rect width="300" height="170" fill="#f6ecd9"/><rect y="140" width="300" height="30" fill="#cdbb98"/><rect x="40" y="38" width="220" height="102" fill="${c[0]}"/><rect x="30" y="24" width="240" height="24" fill="${c[1]}"/><text x="150" y="41" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="bold" fill="${c[0]}">ALBERTO CLOCK</text><path d="M36 52h228l-8 24H44z" fill="${c[1]}"/>${win(52)}${win(186)}<rect x="128" y="84" width="44" height="56" rx="4" fill="#f6ecd9"/><circle cx="164" cy="114" r="2.5" fill="${c[0]}"/></svg>`;
}

function renderStores() {
  $("#branch-grid").innerHTML = BRANCHES.map((b, i) => `
    <article class="branch-card">
      <div class="branch-pic">${storeArt(i)}</div>
      <div class="branch-body">
        <h3>${b.name}</h3>
        <p>\u{1F4CD} ${b.address}</p>
        <p>\u{1F4DE} <a href="tel:${b.phone.replace(/\s/g, "")}">${b.phone}</a></p>
        <p>\u{1F552} ${b.hours}</p>
        <a class="btn btn-small" href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.address)}" target="_blank" rel="noopener">Get Directions</a>
      </div>
    </article>`).join("");
}

/* jQuery: Contact form */
window.jQuery && jQuery(function ($) {
  function bad(sel, errSel, isBad) { $(errSel).toggle(isBad); return isBad; }

  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    const name = $.trim($("#ct-name").val());
    const email = $.trim($("#ct-email").val());
    const phone = $.trim($("#ct-phone").val());
    const msg = $.trim($("#ct-msg").val());
    const errs = [
      bad("#ct-name", "#ct-e-name", name.length < 2),
      bad("#ct-email", "#ct-e-email", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
      bad("#ct-phone", "#ct-e-phone", !/^03[0-9]{9}$/.test(phone)),
      bad("#ct-msg", "#ct-e-msg", msg.length < 5)
    ];
    if (errs.some(Boolean)) return;
    this.reset();
    closeContactForm();
    openPopup("#contact-popup");
  });
  $("#contact-ok").on("click", () => closePopup("#contact-popup"));

  /* jQuery: Repair form */
  $("#repair-form").on("submit", function (e) {
    e.preventDefault();
    const name = $.trim($("#r-name").val());
    const address = $.trim($("#r-address").val());
    const phone = $.trim($("#r-phone").val());
    const errs = [
      bad("#r-name", "#r-e-name", name.length < 2),
      bad("#r-service", "#r-e-service", !$("#r-service").val()),
      bad("#r-address", "#r-e-address", address.length < 8),
      bad("#r-phone", "#r-e-phone", !/^03[0-9]{9}$/.test(phone))
    ];
    if (errs.some(Boolean)) return;
    this.reset();
    openPopup("#repair-popup");
  });
  $("#repair-ok").on("click", () => closePopup("#repair-popup"));
});

/* Feedback form (live show hota hai) */
$("#feedback-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#fb-name").value.trim();
  const msg = $("#fb-msg").value.trim();
  const bad1 = name.length < 2, bad2 = msg.length < 5;
  $("#fb-e-name").style.display = bad1 ? "block" : "none";
  $("#fb-e-msg").style.display = bad2 ? "block" : "none";
  if (bad1 || bad2) return;

  const saved = JSON.parse(localStorage.getItem("albertoFeedback") || "[]");
  const d = new Date();
  saved.unshift({
    name, msg,
    rating: +$("#fb-rating").value,
    date: d.toISOString().slice(0, 10)
  });
  localStorage.setItem("albertoFeedback", JSON.stringify(saved));
  $("#feedback-form").reset();
  renderReviews();
  showToast("Thank you! Your feedback is now live");
});

/* ==========================================================
   9. CHAT BOT
   Roman Urdu aur English dono samajhta hai. Product naam, prices,
   best sellers, budget, delivery, repair, offers waghera ka jawab deta hai.
   ========================================================== */

/* Agar aap ka apna AI server ho (API key server par ho), to uska URL yahan
   likhein, e.g. "https://your-site.com/api/chat". Khali chhor dein to bot
   apne rules se jawab dega. API key kabhi is file mein na likhein. */
const AI_CHAT_URL = "";

const CHAT_WA = "+92 300 0000000";

/* Text saaf karna: chhote huruf, accents aur punctuation hatana.
   Shuru aur aakhir mein space rakhte hain taake poore lafz match hon. */
function chatNorm(text) {
  const t = String(text)
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/(\d),(\d)/g, "$1$2")      // 5,000 -> 5000
    .replace(/['\u2019]s\b/g, "s")      // men's -> mens
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return " " + t + " ";
}

/* Poora lafz hi match ho (taake "hi" kisi aur lafz ke andar na mile) */
const hasPhrase = (q, phrase) => q.includes(" " + chatNorm(phrase).trim() + " ");
const hasAny = (q, list) => list.some(k => hasPhrase(q, k));

/* Categories ke lafz */
const CHAT_CATS = {
  women: ["women", "womens", "woman", "ladies", "lady", "female", "girl", "girls", "aurat", "zanana"],
  men:   ["men", "mens", "man", "gents", "gent", "male", "boy", "boys", "mard", "mardana"],
  wall:  ["wall", "walls", "deewar", "pendulum", "clock", "clocks"]
};
const CHAT_CAT_NAMES = { women: "Women's Watches", men: "Men's Watches", wall: "Wall Clocks" };
const CHAT_CAT_WORDS = Object.values(CHAT_CATS).flat();

function chatCategory(q) {
  for (const c of Object.keys(CHAT_CATS)) {
    if (hasAny(q, CHAT_CATS[c])) return c;
  }
  return null;
}

/* Ye lafz product dhoondte waqt nazar-andaz honge */
const CHAT_STOP = new Set((
  "a an the and or of for with in on at to is are am be me my i you we our do does can could would " +
  "please pls show give tell want need some any also ka ki ke ko hai hain ho se mein chahiye batao " +
  "bataye koi kon konsi konsa kaunsi kaunsa kya kitne kitna kitni best good top new suggest " +
  "suggestion recommend which what watch watches price prices cost rate much how acha achi achha " +
  "behtareen lena dikhao hi hello hey salam assalam aoa thanks thank item items wala wali wale"
).split(" "));

function chatWords(text) {
  return chatNorm(text).trim().split(" ").filter(w =>
    w.length >= 3 && !CHAT_STOP.has(w) && !CHAT_CAT_WORDS.includes(w) && !/^\d+$/.test(w)
  );
}

/* Product naam se milana: jitne zyada lafz milen, utna pehle */
function chatFindProducts(q) {
  const words = chatWords(q);
  if (!words.length) return { list: [], max: 0 };
  const scored = PRODUCTS.map(p => {
    const pw = chatWords(p.name);
    return { p: p, score: words.filter(w => pw.includes(w)).length };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  return { list: scored.map(x => x.p), max: scored.length ? scored[0].score : 0 };
}

/* Budget: "5000 ke andar", "under 7k", "budget 6 hazar" */
const BUDGET_WORDS = ["under", "below", "less", "upto", "up", "tak", "andar", "neeche", "budget", "within", "max", "maximum", "kam", "sasta", "sasti"];
const PRICE_WORDS = ["price", "prices", "cost", "rate", "pkr", "rs", "rupees", "qeemat", "qimat", "daam"];

function chatBudget(q) {
  const m = q.match(/(\d+(?:\.\d+)?)\s?(k|hazar|hazaar|thousand)?\b/);
  if (!m) return 0;
  const value = parseFloat(m[1]) * (m[2] ? 1000 : 1);
  return value >= 500 ? value : 0;
}

function chatBudgetAnswer(max, cat) {
  const pool = PRODUCTS.filter(p => !cat || p.category === cat);
  const list = pool.filter(p => p.price <= max).sort((a, b) => b.price - a.price);
  if (!list.length) {
    const cheapest = pool.slice().sort((a, b) => a.price - b.price)[0];
    return "Is budget (" + pkr(max) + ") mein abhi koi item nahi hai. Sabse sasta item " +
      cheapest.name + " hai, " + pkr(cheapest.price) + " ka.";
  }
  const lines = list.slice(0, 6).map(p => "• " + p.name + " – " + pkr(p.price));
  const more = list.length > 6 ? "\n...aur " + (list.length - 6) + " items Collection page par hain." : "";
  return pkr(max) + " ke andar ye options hain:\n" + lines.join("\n") + more;
}

/* Best sellers (kisi category ke liye ya teeno ke liye) */
function chatBest(cat) {
  const cats = cat ? [cat] : ["women", "men", "wall"];
  const perCat = cat ? 6 : 2;
  const blocks = cats.map(c => {
    const list = PRODUCTS.filter(p => p.bestseller && p.category === c).slice(0, perCat);
    if (!list.length) return "";
    return CHAT_CAT_NAMES[c] + ":\n" + list.map(p => "• " + p.name + " – " + pkr(p.price)).join("\n");
  }).filter(Boolean);
  return "Hamari best sellers ye hain:\n\n" + blocks.join("\n\n") +
    "\n\nBudget bata dein (e.g. \"5000 ke andar\") ya style (gold, pearl, chronograph) to aur behtar suggestion de sakta hoon.";
}

/* Ek category ki list */
function chatCategoryAnswer(cat) {
  const list = PRODUCTS.filter(p => p.category === cat);
  const lines = list.slice(0, 6).map(p => "• " + p.name + " – " + pkr(p.price));
  const more = list.length > 6 ? "\n...aur " + (list.length - 6) + " items bhi hain.\n" : "\n";
  return CHAT_CAT_NAMES[cat] + ":\n" + lines.join("\n") + more +
    "Poori list Collection page par filter karke dekh sakte hain.";
}

/* Sirf price poochne par (product naam ke bagair) */
function chatPriceAnswer() {
  return "Sab prices PKR mein Collection page par likhi hain, aur high-to-low ya low-to-high sort bhi ho sakti hain. " +
    "Kisi watch ka naam likhein (e.g. \"chronograph price\") ya budget batayein (e.g. \"5000 ke andar\") to main seedha bata sakta hoon.";
}

/* Product mil jaye to uska jawab */
function chatProductAnswer(list) {
  const top = list.slice(0, 4);
  if (top.length === 1) {
    const p = top[0];
    return p.name + "\nPrice: " + pkr(p.price) +
      "\n\nDetails ke liye Collection page dekhein. Order ke liye \"Add to cart\" dabayein ya WhatsApp par baat karein.";
  }
  return "Ye items mil gaye:\n" + top.map(p => "• " + p.name + " – " + pkr(p.price)).join("\n");
}

/* Jawab ke topics. "hard" wale topics product naam se pehle dekhe jate hain. */
const CHAT_INTENTS = [
  { id: "delivery", hard: true,
    keys: ["delivery", "shipping", "deliver", "dispatch", "courier", "parcel", "kab tak", "kitne din", "pohanchega", "pohnchega", "arrive"],
    answer: () => "Orders aam taur par Pakistan mein kahin bhi 3 se 5 working days mein deliver ho jate hain." },

  { id: "repair", hard: true,
    keys: ["repair", "service", "battery", "strap", "fix", "kharab", "tooti", "broken", "repairing", "sahi karwana"],
    answer: () => "Hum watches aur wall clocks ki repair aur service karte hain. Repair Service page par form bharein, hamari team aap se rabta karegi." },

  { id: "offers", hard: true,
    keys: ["offer", "offers", "discount", "coupon", "promo", "code", "sale", "bogo", "off"],
    answer: () => "Offers page par chhe offers hain: BOGO (ek lo ek muft), HALF50, OFF10, OFF20, OFF30 aur OFF40. Offer claim karke code cart mein apply karein." },

  { id: "warranty", hard: true,
    keys: ["warranty", "guarantee", "garanti"],
    answer: () => "Haan, products ke saath warranty milti hai. Shartein product ke hisab se hoti hain aur order ke saath share ki jati hain." },

  { id: "returns", hard: true,
    keys: ["return", "refund", "exchange", "replace", "wapas", "damaged", "wrong"],
    answer: () => "Agar item damaged ya ghalat aaye to delivery ke 7 din ke andar hum se rabta karein, hum replace kar denge." },

  { id: "payment", hard: true,
    keys: ["payment", "pay", "cash", "cod", "card", "easypaisa", "jazzcash", "bank", "transfer"],
    answer: () => "Abhi hum Cash on Delivery qabool karte hain. Order aane par hi payment karni hoti hai." },

  { id: "custom", hard: true,
    keys: ["custom", "customize", "customise", "engrave", "engraving", "personalize", "personalise", "naam likh", "design"],
    answer: () => "Custom watch ya wall clock ke liye Customize page par form bharein (dial, strap, engraving waghera). Form submit karne par request WhatsApp par chali jayegi." },

  { id: "store", hard: true,
    keys: ["store", "stores", "branch", "branches", "shop", "visit", "location", "address", "kahan", "kahaan", "kidhar", "map"],
    answer: () => "Store ki maloomat Store Locator page par hai. Address aur rabta ke liye Contact Us page dekhein." },

  { id: "contact", hard: true,
    keys: ["contact", "phone", "whatsapp", "number", "email", "call", "helpline"],
    answer: () => "Phone, email aur address ke liye Contact Us page dekhein. WhatsApp: " + CHAT_WA + "." },

  { id: "cart", hard: true,
    keys: ["cart", "checkout", "buy", "order", "kharidna"],
    answer: () => "Product par \"Add to cart\" dabayein, phir Cart page par jaakar checkout karein. Payment Cash on Delivery hai." },

  { id: "wishlist", hard: true,
    keys: ["wishlist", "wish", "favourite", "favorite"],
    answer: () => "Kisi bhi product par ♡ dabayein to wishlist mein save ho jata hai. Wishlist navigation mein hai." },

  { id: "about", hard: true,
    keys: ["about", "who are you", "kaun ho", "kon ho", "assistant"],
    answer: () => "Main Alberto Clock ka website assistant hoon. Products, prices, delivery, repair, offers aur custom orders mein madad kar sakta hoon." },

  { id: "bye", hard: true,
    keys: ["bye", "goodbye", "khuda hafiz", "allah hafiz"],
    answer: () => "Khuda Hafiz! Alberto Clock ko chunne ka shukriya." },

  { id: "thanks", hard: true,
    keys: ["thanks", "thank", "shukriya", "shukria", "thx"],
    answer: () => "Shukriya! Koi aur sawal ho to zaroor poochein." },

  // Soft topics (ye product naam ke saath bhi chal sakte hain)
  { id: "recommend", hard: false,
    keys: ["best", "suggest", "suggestion", "recommend", "recommendation", "top", "popular", "bestseller", "best seller", "which", "konsi", "kon si", "konsa", "kaunsi", "kaunsa", "acha", "achi", "achha", "behtareen", "pasand", "lun", "loon"],
    answer: (q) => chatBest(chatCategory(q)) },

  { id: "category", hard: false,
    keys: CHAT_CAT_WORDS.concat(["show", "dikhao", "collection", "sab"]),
    answer: (q) => {
      const c = chatCategory(q);
      return c ? chatCategoryAnswer(c)
        : "Hamari teen categories hain: Women's Watches, Men's Watches aur Wall Clocks. Kaunsi category dekhni hai?";
    } },

  { id: "price", hard: false,
    keys: ["price", "prices", "cost", "rate", "how much", "kitne ka", "kitne ki", "qeemat", "qimat", "daam", "pkr", "rs", "rupees"],
    answer: () => chatPriceAnswer() },

  { id: "greet", hard: false,
    keys: ["hi", "hello", "hey", "salam", "assalam", "aoa", "slam", "hiya"],
    answer: () => "Assalam o Alaikum! Alberto Clock mein khush amdeed. Aap best watches, price, delivery, repair ya offers ke baare mein pooch sakte hain." }
];

/* Sab se zyada milne wala topic */
function chatBestIntent(q, hardOnly) {
  let best = null, bestScore = 0;
  CHAT_INTENTS.forEach(it => {
    if (hardOnly && !it.hard) return;
    const score = it.keys.filter(k => hasPhrase(q, k)).length;
    if (score > bestScore) { best = it; bestScore = score; }
  });
  return { it: best, score: bestScore };
}

/* Main jawab. Kuch samajh na aaye to null deta hai. */
function botAnswer(text) {
  const q = chatNorm(text);
  if (q.trim() === "") return null;

  // 1) Budget wala sawal
  const budget = chatBudget(q);
  if (budget && (hasAny(q, BUDGET_WORDS) || hasAny(q, PRICE_WORDS))) {
    return chatBudgetAnswer(budget, chatCategory(q));
  }

  // 2) Product ka naam (e.g. "chronograph price", "pearl strap")
  const found = chatFindProducts(q);
  const topic = chatBestIntent(q, true);
  if (found.list.length && (found.max >= 2 || !topic.it)) {
    return chatProductAnswer(found.list);
  }

  // 3) Topics aur general sawal
  const best = chatBestIntent(q, false);
  if (best.it) return best.it.answer(q);

  return null;
}

/* Jawab dene ka tareeqa: pehle local rules, phir (agar set ho) AI server */
const CHAT_FALLBACK = "Is sawal ka mujhe pakka jawab nahi mila. Aap ye pooch sakte hain: " +
  "\"best watches\", \"women watches\", \"5000 ke andar\", \"chronograph price\", \"delivery\", \"repair\", \"offers\" ya \"store\". " +
  "Mazeed madad ke liye WhatsApp: " + CHAT_WA + ".";

async function getBotReply(text) {
  const local = botAnswer(text);
  if (local) return local;
  if (AI_CHAT_URL) {
    try {
      const res = await fetch(AI_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      if (data && data.reply) return data.reply;
    } catch (err) {
      /* AI server na chale to fallback dikhayenge */
    }
  }
  return CHAT_FALLBACK;
}

/* Chat window: open / close, emojis, send */
$("#chat-btn").addEventListener("click", () => {
  const box = $("#chat-box");
  box.classList.toggle("show");
  if (box.classList.contains("show") && !$("#chat-log").children.length) {
    addBubble("Assalam o Alaikum! Main Alberto Clock ka assistant hoon. Best watches, price (e.g. \"chronograph price\"), budget (\"5000 ke andar\"), delivery, repair ya offers poochein.", "bot");
  }
});

$("#chat-emojis").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  $("#chat-input").value += b.textContent;
  $("#chat-input").focus();
});

function addBubble(text, who) {
  const b = document.createElement("div");
  b.className = "bubble " + who;
  b.textContent = text;
  $("#chat-log").appendChild(b);
  $("#chat-log").scrollTop = $("#chat-log").scrollHeight;
}

$("#chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = $("#chat-input").value.trim();
  if (!text) return;
  addBubble(text, "me");
  $("#chat-input").value = "";
  const reply = await getBotReply(text);
  addBubble(reply, "bot");
});

/* ==========================================================
   MOBILE HAMBURGER MENU
   Button dabane par nav khulta hai. Link par, bahar dabane par
   ya Escape dabane par band hota hai.
   ========================================================== */
(function () {
  const btn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setOpen(false);
  });
})();

/* ==========================================================
   VISITOR COUNTER
   Har browser session mein ek baar count badhta hai.
   Global count ke liye free counter service (counterapi.dev) use hoti hai.
   Agar service kaam na kare to is device par local count dikhta hai.
   ========================================================== */
(function () {
  const el = document.getElementById("visitor-count");
  if (!el) return;

  const NAMESPACE = "alberto-clock";   // apni marzi ka naam rakh sakte hain
  const KEY = "site-visits";
  const API = "https://api.counterapi.dev/v1/" + NAMESPACE + "/" + KEY;
  const SESSION_FLAG = "albertoVisitCounted";

  const show = (n) => { el.textContent = Number(n).toLocaleString("en-US"); };
  const alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === "1";

  fetch(alreadyCounted ? API : API + "/up")
    .then(res => { if (!res.ok) throw new Error("status " + res.status); return res.json(); })
    .then(data => {
      const n = data.count ?? (data.data && (data.data.up_count ?? data.data.count));
      if (typeof n !== "number") throw new Error("no count in response");
      sessionStorage.setItem(SESSION_FLAG, "1");
      show(n);
    })
    .catch(() => {
      let n = parseInt(localStorage.getItem("albertoVisitsLocal") || "0", 10);
      if (!alreadyCounted) {
        n += 1;
        localStorage.setItem("albertoVisitsLocal", String(n));
        sessionStorage.setItem(SESSION_FLAG, "1");
      }
      show(n);
    });
})();

/* ==========================================================
   10. START (splash, logos, first page)
   ========================================================== */
placeLogos();
Object.assign(IMAGES, {
  tech_auto: "images/tech_auto.svg",
  tech_quartz: "images/tech_quartz.svg",
  tech_sapphire: "images/tech_sapphire.svg",
  tech_water: "images/tech_water.svg",
  tech_lumi: "images/tech_lumi.svg"
});
$$("[data-img]").forEach(img => img.src = IMAGES[img.dataset.img]);
const revealObs = new IntersectionObserver((list) => list.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); }
}), { threshold: 0.12 });
$$(".reveal").forEach(el => revealObs.observe(el));
updateCartCount();
showPage();

const pendingSupportTab = sessionStorage.getItem("albertoPendingSupportTab");
if (pendingSupportTab) { sessionStorage.removeItem("albertoPendingSupportTab"); applySupportTab(pendingSupportTab); }

/* Home page ki background video chalana
   Video <video> tag mein hi lagi hai (index.html). Yahan bas play karwate hain.
   Agar browser autoplay rok de, to pehli touch/click par video chal padti hai. */
const heroVideo = $("#hero-video");
if (heroVideo) {
  // Poster photo aur video ke 2 formats (WebM pehle, MP4 backup) lagana
  heroVideo.poster = HERO_POSTER;
  [[VIDEO_WEBM, "video/webm"], [VIDEO_MP4, "video/mp4"]].filter(([src]) => src).forEach(([src, type]) => {
    const source = document.createElement("source");
    source.src = src;
    source.type = type;
    heroVideo.appendChild(source);
  });
  heroVideo.load();
  heroVideo.muted = true;
  heroVideo.play().catch(() => {
    const startOnTouch = () => heroVideo.play().catch(() => {});
    document.addEventListener("touchstart", startOnTouch, { once: true });
    document.addEventListener("click", startOnTouch, { once: true });
  });
}

/* Professional branded preloader: show on initial load/refresh, skip only between pages */
const splash = $("#splash");
if (splash) {
  if (sessionStorage.getItem("albertoPageNavigation") === "1") {
    sessionStorage.removeItem("albertoPageNavigation");
    splash.remove();
  } else {
    setTimeout(() => {
      splash.classList.add("hide");
      setTimeout(() => splash.remove(), 650);
    }, 5000);
  }
}

