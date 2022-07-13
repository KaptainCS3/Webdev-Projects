//form validation js
//! Targetting form el 

const form = document.getElementById("form_submit");
const email = document.getElementById("email");

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    checkInput();
});

function checkInput(){
    const emailValue = email.value.trim();

    if(emailValue === ''){
        setErrorFor(email, 'email can not be blank');
    }
    else if(){

    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = document.querySelector('small');

    small.innerText = message;
    formControl = 'error_control error'
}

function isValidEmail(email){
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

