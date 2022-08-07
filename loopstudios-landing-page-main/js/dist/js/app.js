// nav bar
const markerNav = document.querySelector("#marker");
const slideNav = document.querySelectorAll("[data-slide-nav]");

// nav footer
let marker = document.querySelector("#marker_footer");
const slideFooter = document.querySelectorAll("[data-slide]");

//social icon
const socialIcon = document.getElementById("icon");
const slideIcon = document.querySelectorAll("[data-slide-icon]");


// active state navbar
function indicatorNav(f) {
  markerNav.style.left = f.offsetLeft + "px";
  markerNav.style.width = f.offsetWidth + "px";
}
slideNav.forEach((link) => {
  link.addEventListener("mouseover", (f) => {
    indicatorNav(f.target);
  });
});


// active state socialIcon
function indicatorIcon(el) {
  marker.style.left = el.offsetLeft + "px";
  marker.style.width = el.offsetWidth + "px";
}
slideIcon.forEach((icons) => {
  icons.addEventListener("mouseover", (el) => {
    indicatorIcon(el.target);
  });
});
