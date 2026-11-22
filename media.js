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

// The homepage owns the video source. Other pages get the same video in their banner.
const HERO_POSTER = "";
const VIDEO_WEBM = "";
const VIDEO_MP4 = "";

(function mountSharedHeroVideo() {
  const file = location.pathname.split("/").pop().replace(/\.html?$/i, "");
  const pageName = !file || file === "index" ? "home" : file;
  const page = document.getElementById("page-" + pageName);
  if (!page) return;

  const host = page.querySelector(".hero") || page.querySelector(".page-banner");
  if (!host) return;

  let video = document.getElementById("hero-video");
  if (!video) {
    video = document.createElement("video");
    video.id = "hero-video";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
  }

  // Keep the existing homepage source, and add it to pages without a video element.
  if (!video.querySelector("source") && !video.getAttribute("src")) {
    const source = document.createElement("source");
    source.src = "1000894777.mp4";
    source.type = "video/mp4";
    video.appendChild(source);
  }
  video.removeAttribute("poster");
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  if (video.parentNode !== host) host.prepend(video);

  if (!document.getElementById("shared-hero-video-style")) {
    const style = document.createElement("style");
    style.id = "shared-hero-video-style";
    style.textContent = `
      .page-banner { position: relative; overflow: hidden; }
      .page-banner video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; }
      .page-banner > :not(video) { position: relative; z-index: 2; }
      .page-banner::after { content: ""; position: absolute; inset: 0; background: rgba(63,13,25,.35); z-index: 1; pointer-events: none; }
    `;
    document.head.appendChild(style);
  }
})();

document.querySelectorAll("[data-img]").forEach((img) => {
  const src = IMAGES[img.dataset.img];
  if (src) img.src = src;
});
