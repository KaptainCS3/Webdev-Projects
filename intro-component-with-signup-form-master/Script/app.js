const first = document.querySelector("#fname");
const last = document.querySelector("#lname");
const email = document.querySelector("#email");
const pass = document.querySelector("#password");
const form = document.querySelector(".form__container");

form.addEventListener("submit", (e) => {
  if (first.value === "") {
    e.preventDefault();
    first.nextSibling.remove();
    first.classList.add("err");
    let text = document.createElement("span");
    text.innerText = "First Name cannot be empty";
    text.classList.add("error__email");
    first.parentNode.insertBefore(text, first.nextSibling);
  }
  if (last.value === "") {
    e.preventDefault();
    last.nextSibling.remove();
    last.classList.add("err");
    let text = document.createElement("span");
    text.innerText = "Last Name cannot be empty";
    text.classList.add("error__email");
    last.parentNode.insertBefore(text, last.nextSibling);
  }
  if (
    email.value === "" ||
    !email.value.includes("@") ||
    !email.value.includes(".com")
  ) {
    e.preventDefault();
    email.nextSibling.remove();
    email.classList.add("err");
    let text = document.createElement("span");
    text.innerText = "Looks like this in not an email";
    text.classList.add("error__email");
    email.parentNode.insertBefore(text, email.nextSibling);
  }
  if (pass.value === "") {
    e.preventDefault();
    pass.nextSibling.remove();
    pass.classList.add("err");
    let text = document.createElement("span");
    text.innerText = "Password cannot be empty";
    text.classList.add("error__email");
    pass.parentNode.insertBefore(text, pass.nextSibling);
  }
});

form.addEventListener("click", () => {
  first.value === "" ? null : first.classList.remove("err");
  last.value === "" ? null : last.classList.remove("err");
  email.value === "" ? null : email.classList.remove("err");
  pass.value === "" ? null : pass.classList.remove("err");
});