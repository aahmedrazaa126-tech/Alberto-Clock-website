/* Compatibility loader for pages that still reference js/media.js.
   Load the shared root-level media.js synchronously so IMAGES is defined
   before main.js initializes products and renders pages. */
document.write('<script src="media.js"><\/script>');
