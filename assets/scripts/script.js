
let isAccountRegistered = localStorage.length == 0 ? false : true;

if (isAccountRegistered)
    setupLoginForm();

function setupLoginForm(){
    document.querySelector(".title").innerHTML = "LOGIN";
    document.getElementsByName("confirm-password")[0].parentElement.style.display = "none";
    document.getElementsByName("confirm-password")[0].removeAttribute("required");
}

function Submit(){    
    if (!isAccountRegistered){
        if (registerValidation()){
            localStorage.setItem(document.getElementsByName("username")[0].value, document.getElementsByName("password")[0].value);
        }
        return;
    }
    if (loginValidation()){
        loginSuccesfull(); 
    }
}

function registerValidation(){
    if (document.getElementsByName("username")[0].value.length < 5 || document.getElementsByName("username")[0].value.length > 10){
        alert("\nInvalid username \n\n Username cannot be shorter than 5 characters or longer than 10.");
        return false;
    }
    else if (document.getElementsByName("password")[0].value.length < 5 || document.getElementsByName("password")[0].value.length > 10){
        alert("\nInvalid password \n\n Password cannot be shorter than 5 characters or longer than 10.");
        return false;
    }
    else if(document.getElementsByName("password")[0].value != document.getElementsByName("confirm-password")[0].value){
        alert("\nPasswords don't match");
        return false;
    }
    return true;
}

function loginValidation(){
    if(localStorage[document.getElementsByName("username")[0].value] != document.getElementsByName("password")[0].value){
        alert("\nInvalid username or password");
        return false;
    }
    return true;
}

function loginSuccesfull(){
    document.querySelector(".register").style.display = "none";
    document.querySelector("main").style.display = "flex";
}