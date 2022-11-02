const btn = document.querySelector("button");
const errorMessage = document.querySelector(".error__email");
const email = document.querySelector("#email");
const error = document.querySelector(".error_control");
const submit = document.querySelector("#form_submit");
function handleSubmit(event) {
  event.preventDefault();
}
submit.addEventListener("submit", handleSubmit)
btn.addEventListener("click", () => {
  if (!email.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    email.style.borderColor = "#f96262";
    error.style.display = "block";
    errorMessage.innerHTML = "Please enter a valide email";
    return false;
  } else {
    email.style.borderColor = "#0f0";
    error.style.display = "none";
    errorMessage.innerHTML = "";
    handleSubmit()

   return true;
  }
});
