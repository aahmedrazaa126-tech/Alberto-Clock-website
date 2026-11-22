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

const HERO_POSTER = "men1.jpg";
const VIDEO_WEBM = "";
const VIDEO_MP4 = "1000894777.mp4";

// Technology illustrations and all existing media are resolved from the repository root.
document.querySelectorAll("[data-img]").forEach((img) => {
  const src = IMAGES[img.dataset.img];
  if (src) img.src = src;
});
