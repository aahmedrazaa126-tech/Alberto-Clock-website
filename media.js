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

// Use an existing product photo as the fallback while the hero video loads.
const HERO_POSTER = "men1.jpg";
const VIDEO_WEBM = "";
const VIDEO_MP4 = "1000894777.mp4";

// main.js assigns the technology image paths later; reset all image sources to
// the existing files in the repository root after that script has run.
setTimeout(() => {
  Object.assign(IMAGES, {
    tech_auto: "tech_auto.svg",
    tech_quartz: "tech_quartz.svg",
    tech_sapphire: "tech_sapphire.svg",
    tech_water: "tech_water.svg",
    tech_lumi: "tech_lumi.svg"
  });

  document.querySelectorAll("[data-img]").forEach((img) => {
    const src = IMAGES[img.dataset.img];
    if (src) img.src = src;
  });
}, 0);

// On non-home pages, main.js moves the same hero video into the page banner.
// Give it a background-video treatment there too, without modifying every HTML file.
const heroBannerStyles = document.createElement("style");
heroBannerStyles.textContent = `
  .page-banner { position: relative; overflow: hidden; isolation: isolate; }
  .page-banner video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  .page-banner::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(63, 13, 25, .48);
    z-index: 1;
    pointer-events: none;
  }
  .page-banner > h1,
  .page-banner > p { position: relative; z-index: 2; }
`;
document.head.appendChild(heroBannerStyles);
