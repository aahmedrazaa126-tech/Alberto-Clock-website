/* ==========================================================
   CUSTOMIZE: watch & wall clock popup forms (self-contained)
   ========================================================== */
(function () {
  const q = (s, r) => (r || document).querySelector(s);
  const qa = (s, r) => Array.from((r || document).querySelectorAll(s));
  const WA = "923000000000";
  let lastFocus = null;

  function open(id) {
    const m = q(id); if (!m) return;
    lastFocus = document.activeElement;
    m.classList.add("show"); document.body.classList.add("cz-lock");
    setTimeout(() => { const f = q("input[type=text],input[type=tel]", m); f && f.focus({ preventScroll: true }); }, 450);
  }
  function close(m) {
    (m ? [m] : qa(".cz-modal.show")).forEach(x => x.classList.remove("show"));
    if (!q(".cz-modal.show")) document.body.classList.remove("cz-lock");
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }
  const val = (n, f) => { const e = q('input[name="' + n + '"]:checked', f); return e ? e.value : ""; };
  const col = (n, f) => { const e = q('input[name="' + n + '"]:checked', f); return e ? e.dataset.c : ""; };
  const showErr = (id, bad) => { q(id).style.display = bad ? "block" : "none"; return bad; };

  /* open / close wiring */
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-cz-open]");
    if (o) { open(o.dataset.czOpen === "watch" ? "#cz-watch-modal" : "#cz-wall-modal"); return; }
    if (e.target.closest("[data-cz-close]")) { close(e.target.closest(".cz-modal")); return; }
    if (e.target.classList.contains("cz-modal")) close(e.target);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  /* ---------- Watch preview ---------- */
  const wf = q("#cz-watch-form"), wp = q("#cz-w-prev");
  function updWatch() {
    const d = q('input[name="w-dial"]:checked', wf);
    wp.style.setProperty("--dial", d.dataset.c); wp.style.setProperty("--hand", d.dataset.h);
    wp.style.setProperty("--case", col("w-case", wf));
    wp.style.setProperty("--strap", col("w-scol", wf));
  }
  wf.addEventListener("change", updWatch); updWatch();

  /* ---------- Wall clock preview ---------- */
  const cf = q("#cz-wall-form"), cp = q("#cz-c-prev");
  function updWall() {
    const mat = val("c-mat", cf);
    const wood = mat !== "Steel", steel = mat !== "Wood";
    q("#c-wood-box").classList.toggle("cz-hide", !wood);
    q("#c-steel-box").classList.toggle("cz-hide", !steel);
    const woodC = col("c-wood", cf), steelC = col("c-steel", cf);
    cp.style.setProperty("--frame", mat === "Steel" ? steelC : woodC);
    cp.style.setProperty("--ring", mat === "Wood + Steel" ? steelC : (mat === "Steel" ? "#f7f1e3" : "#d9b56a"));
    q("#cz-grain").style.display = mat === "Steel" ? "none" : "";
    const s = val("c-shape", cf);
    q("#cz-sh-round").classList.toggle("cz-hide", s !== "Round");
    q("#cz-sh-square").classList.toggle("cz-hide", s !== "Square");
    q("#cz-sh-oct").classList.toggle("cz-hide", s !== "Octagon");
    const ds = val("c-dial", cf);
    const nums = q("#cz-nums");
    nums.classList.toggle("cz-hide", ds === "Minimal (no numbers)");
    q("#cz-dots").classList.toggle("cz-hide", ds !== "Minimal (no numbers)");
    const t = nums.querySelectorAll("text");
    const set = ds === "Roman Numerals" ? ["XII","III","VI","IX"] : ["12","3","6","9"];
    t.forEach((n, i) => n.textContent = set[i]);
    q("#cz-ctext").textContent = q("#c-engrave").value.slice(0, 24);
  }
  cf.addEventListener("change", updWall);
  q("#c-engrave").addEventListener("input", updWall); updWall();

  /* ---------- Submit ---------- */
  function ref() { return "ALB-" + Date.now().toString(36).toUpperCase().slice(-6); }
  function finish(kind, lines, modal, form) {
    const r = ref();
    try {
      const all = JSON.parse(localStorage.getItem("albertoCustomRequests") || "[]");
      all.unshift({ ref: r, kind, date: new Date().toISOString(), details: lines });
      localStorage.setItem("albertoCustomRequests", JSON.stringify(all.slice(0, 50)));
    } catch (e) {}
    const msg = "Hello Alberto Clock, I would like a custom " + kind + " (Ref " + r + "):\n" + lines.join("\n");
    q("#cz-ref").textContent = r;
    q("#cz-wa").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
    form.reset(); form === wf ? updWatch() : updWall();
    lastFocus = null; close(modal);
    q("#cz-popup").classList.add("show");
  }
  q("#cz-ok").addEventListener("click", () => q("#cz-popup").classList.remove("show"));

  wf.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = q("#w-name").value.trim(), phone = q("#w-phone").value.trim(), addr = q("#w-address").value.trim();
    const errs = [showErr("#w-e-name", name.length < 2), showErr("#w-e-phone", !/^03[0-9]{9}$/.test(phone)), showErr("#w-e-address", addr.length < 8)];
    if (errs.some(Boolean)) { const b = q(".error[style*=block]", wf); b && b.previousElementSibling.focus(); return; }
    const L = [
      "Type: Watch for " + val("w-for", wf),
      "Dial: " + val("w-dial", wf) + (q("#w-dialtext").value.trim() ? " (text: " + q("#w-dialtext").value.trim() + ")" : ""),
      "Case: " + val("w-case", wf) + ", " + q("#w-size").value,
      "Strap: " + val("w-strap", wf) + ", " + val("w-scol", wf),
      "Engraving: " + (q("#w-engrave").value.trim() || "None"),
      "Quantity: " + (q("#w-qty").value || 1),
      "Name: " + name, "Mobile: " + phone, "Address: " + addr,
      "Notes: " + (q("#w-notes").value.trim() || "None")
    ];
    finish("watch", L, q("#cz-watch-modal"), wf);
  });

  cf.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = q("#cz-c-name").value.trim(), phone = q("#cz-c-phone").value.trim(), addr = q("#cz-c-address").value.trim();
    const errs = [showErr("#cz-c-e-name", name.length < 2), showErr("#cz-c-e-phone", !/^03[0-9]{9}$/.test(phone)), showErr("#cz-c-e-address", addr.length < 8)];
    if (errs.some(Boolean)) { const b = q(".error[style*=block]", cf); b && b.previousElementSibling.focus(); return; }
    const mat = val("c-mat", cf);
    const L = [
      "Material: " + mat,
      mat !== "Steel" ? "Wood: " + val("c-wood", cf) : null,
      mat !== "Wood" ? "Steel finish: " + val("c-steel", cf) : null,
      "Shape: " + val("c-shape", cf) + ", " + q("#c-size").value,
      "Dial: " + val("c-dial", cf), "Pendulum: " + val("c-pend", cf),
      "Name/text: " + (q("#c-engrave").value.trim() || "None"),
      "Quantity: " + (q("#c-qty").value || 1),
      "Name: " + name, "Mobile: " + phone, "Address: " + addr,
      "Notes: " + (q("#c-notes").value.trim() || "None")
    ].filter(Boolean);
    finish("wall clock", L, q("#cz-wall-modal"), cf);
  });
})();
