const slide = document.querySelectorAll("[data-slide]")
const slideNav = document.querySelectorAll("[data-slide-nav]");
const slideIcon = document.querySelectorAll("[data-slide-icon]");
let marker = document.querySelector("#marker_footer");
let icon = document.querySelector("#icon");
const markerNav = document.querySelector("#marker");

function indicatorNav(f) {
  markerNav.style.left = f.offsetLeft + "px";
  markerNav.style.width = f.offsetWidth + "px";
}
slideNav.forEach((link) => {
  link.addEventListener("mouseover", (f) => {
    indicatorNav(f.target);
  });
});

function indicator(e) {
  icon.style.left = e.offsetLeft + "px";
  icon.style.width = e.offsetWidth + "px";
}
slide.forEach(link =>{
    link.addEventListener('mouseover', (e) =>{
        indicator(e.target)
    })
})

function indicatorIcon(el) {
  marker.style.left = el.offsetLeft + "px";
  marker.style.width = el.offsetWidth + "px";
}
slideIcon.forEach(link => {
  link.addEventListener("mouseover", (el) => {
    indicatorIcon(el.target);
  });
});

