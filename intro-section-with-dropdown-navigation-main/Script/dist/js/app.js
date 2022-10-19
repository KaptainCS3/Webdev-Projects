document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let show = document.querySelector(".arrow-down");
  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
    // toggle arrow indicator
    show.classList.toggle("arrow-up");
  }
});

const sidePanel = document.querySelector(".side__panel");
const burger = document.querySelector(".burger__menu");
const closeBurger = document.querySelector(".close__menu");
burger.addEventListener("click", () => {
  sidePanel.style.width = "70%";
  burger.style.display = "none";
  closeBurger.style.display = "block";
});
closeBurger.addEventListener("click", () => {
  sidePanel.style.width = 0;
  closeBurger.style.display = "none";
  burger.style.display = "block";
});

/*
    -----------------------------------------------
    |                                             |
    | drop down toggle bug not completely solved  |
    |                                             |
    |                                             |
    |                                             |
    -----------------------------------------------

*/
