const btn = document.querySelector("button");
const errorMessage = document.querySelector(".error__email");
const errorMessage_ = document.querySelector(".error__email_");
const email = document.querySelector("#email");
const submit = document.querySelector(".form");
const emailStarter = document.querySelector("#email__starter");
const submitStarter = document.querySelector(".form__section");
const btnStarter = document.querySelector(".btn__start");
function handleSubmit(event) {
  event.preventDefault();
}
submit.addEventListener("submit", handleSubmit);
submitStarter.addEventListener("submit", handleSubmit);
btn.addEventListener("click", () => {
  if (!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    email.style.borderColor = "#f96262";
    errorMessage.innerHTML = "Please check your email";
    return false;
  } else {
    email.style.borderColor = "#0f0";
    errorMessage.innerHTML = "";
    handleSubmit();
    return true;
  }
});
btnStarter.addEventListener("click", () => {
  if (!emailStarter.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailStarter.style.borderColor = "#f96262";
    errorMessage_.innerHTML = "Please check your email";
    errorMessage_.style.marginTop = 10 + "px";
    return false;
  } else {
    emailStarter.style.borderColor = "#0f0";
    errorMessage.innerHTML = "";
    handleSubmit();
    return true;
  }
});
