const switch__toggle = document.querySelector("#toggle__switch");
const basic = document.querySelector(".basic");
const professional = document.querySelector(".professional");
const master = document.querySelector(".master");
const toggle = document.querySelector(".switch");
priceChange = () => {
  if (switch__toggle.checked == true) {
    basic.innerHTML = "&dollar;" + "19.99";
    professional.innerHTML = "&dollar;" + "24.99";
    master.innerHTML = "&dollar;" + "39.99";
  } else {
    basic.innerHTML = "&dollar;" + "199.99";
    professional.innerHTML = "&dollar;" + "249.99";
    master.innerHTML = "&dollar;" + "399.99";
  }
};
toggle.addEventListener("click", () => {
  priceChange();
});

priceChange();
