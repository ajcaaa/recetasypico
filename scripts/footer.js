document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  document.getElementById(
    "copy-footer"
  ).innerHTML = `&copy; ${year} Recetas y Pico`;
});
