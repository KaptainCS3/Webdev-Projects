document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  // const arrowIndicator = e.target.matches("[data-dropdown-indicator]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
});

document.querySelector('hover-f').addEventListener('click', (e) => {
    let show = document.querySelector('show');
    show.classList.add('newStyle');
});


function openNav() {
  document.getElementById("mySidepanel").style.width = "450px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}
