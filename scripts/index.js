// script.js

// Menú hamburguesa
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navList = document.querySelector(".nav-list");

if (hamburgerMenu && navList) {
  hamburgerMenu.addEventListener("click", () => {
    navList.classList.toggle("show");
  });
}


// Búsqueda responsive
const searchIcon = document.querySelector(".search-icon");
const navSearch = document.querySelector(".nav-search");

if (searchIcon && navSearch) {
  searchIcon.addEventListener("click", function (e) {
    if (window.innerWidth < 950) {
      if (navSearch.value.trim() === "") {
        e.preventDefault();
        navSearch.classList.toggle("show");
      }
    } else {
      if (navSearch.value.trim() === "") {
        e.preventDefault();
      }
    }
  });
}
