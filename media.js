const IMAGES = {
  wall1: "wall1.jpg",
  wall2: "wall2.jpg",
  wall3: "wall3.jpg",
  wall4: "wall4.jpg",
  women1: "women1.jpg",
  women2: "women2.jpg",
  women3: "women3.jpg",
  women4: "women4.jpg",
  women5: "women5.jpg",
  women6: "women6.jpg",
  men1: "men1.jpg",
  men2: "men2.jpg",
  men3: "men3.jpg",
  men4: "men4.jpg",
  repair_battery: "repair_battery.jpg",
  repair_strap: "repair_strap.jpg",
  repair_glass: "repair_glass.jpg",
  repair_movement: "repair_movement.jpg",
  repair_servicing: "repair_servicing.jpg",
  repair_wall: "repair_wall.jpg",
  story_watch: "story_watch.jpg",
  tech_auto: "tech_auto.svg",
  tech_quartz: "tech_quartz.svg",
  tech_sapphire: "tech_sapphire.svg",
  tech_water: "tech_water.svg",
  tech_lumi: "tech_lumi.svg"
};

// No poster image: the hero should show the video (or its CSS background while loading), never a watch photo.
const HERO_POSTER = "";
const VIDEO_WEBM = "";
const VIDEO_MP4 = "1000894777.mp4";

// Keep page transitions free of the initial-load splash while preserving the 5-second first-visit loader.
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link || link.dataset.nav === "support" || link.dataset.go === "support") return;

  const href = link.getAttribute("href") || "";
  if (link.dataset.go || /\.html(?:[#?].*)?$/.test(href)) {
    try { sessionStorage.setItem("albertoPageNavigation", "1"); } catch (error) {}
  }
}, true);

// Remove any hard-coded sources so main.js adds the configured video only once.
const heroVideo = document.getElementById("hero-video");
if (heroVideo) {
  heroVideo.removeAttribute("poster");
  heroVideo.querySelectorAll("source").forEach((source) => source.remove());
  heroVideo.autoplay = true;
  heroVideo.muted = true;
  heroVideo.loop = true;
  heroVideo.playsInline = true;
  heroVideo.preload = "auto";
}

document.querySelectorAll("[data-img]").forEach((img) => {
  const src = IMAGES[img.dataset.img];
  if (src) img.src = src;
});
