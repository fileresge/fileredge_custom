let myString = JSON.parse(localStorage.getItem("formFor")) || [];

function from(event){
    event.preventDefault();

    let isValid = true;

    let text = document.getElementById("text").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let textError = document.getElementById("textError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let confirmPasswordError = document.getElementById("confirmPasswordError");
    
    if(text === ""){
        textError.innerText = "Please enter your name";
        isValid = false ;
    }else{
        textError.innerText = "";
    }
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
    if(email === ""){
        emailError.innerText = "Please enter your email";
        isValid = false;
    }else if(!email.match(emailPattern)){
        emailError.innerText = "Invalid Email";
        isValid = false ;
    }else if(myString.some(item => item.email === email)){
        emailError.innerText = "This email is already exists"
        isValid = false;
    }
    else{
        emailError.innerText = "";
    }

    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(password === ""){
        passwordError.innerText = "Please enter your password";
        isValid = false;
    }else if(!password.match(passwordPattern)){
        passwordError.innerText = "Require at least one upper, one lower Caseletter and one number and special char ";
        isValid = false ;
    }else{
        passwordError.innerText = "";
    }

    if(confirmPassword === ""){
        confirmPasswordError.innerText = "Please enter confirm password";
        isValid = false;
    }else if(password !== confirmPassword){
        confirmPasswordError.innerText= "confirm password not match password";
        isValid =false;
    }else{
        confirmPasswordError.innerText = "" ;
    }

    if(isValid === true){
        alert("form submit succssfully");
        let formFor = {
            text : text ,
            email : email ,
            password : password
        }
        myString.push(formFor);
        localStorage.setItem("formFor" , JSON.stringify(myString));
        document.getElementById("signUpForm").reset();
        window.location.href = "login.html";

    }
}


function togglePassword(id ,icon){
    let input = document.getElementById(id);
    if(input.type === "password"){
        input.type = "text";
        icon.textContent = "🙈";
    }else{
        input.type = "password";
        icon.textContent = "👁️";
    }
}




let foundUser = JSON.parse(localStorage.getItem("currentUser"));

function fromLogin(event) {
    event.preventDefault();

    let isValid = true;

    let textLogin = document.getElementById("textLogin").value.trim();
    let passwordLogin = document.getElementById("passwordLogin").value.trim();

    let passwordChange = document.getElementById("passwordChange");
    let displayName = document.getElementById("displayName");

    let textError = document.getElementById("textError");
    let passwordError = document.getElementById("passwordError");

    if (textLogin === "") {
        textError.innerText = "Please enter username or email";
        isValid = false;
    } else {
        textError.innerText = "";
    }

    if (passwordLogin === "") {
        passwordError.innerText = "Please enter password";
        isValid = false;
    } else {
        passwordError.innerText = "";
    }

    foundUser = myString.find(user =>
        (user.text === textLogin || user.email === textLogin) &&
        user.password === passwordLogin
    );
    if (foundUser) {
        alert("Login Successfully!");
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        passwordError.innerText = "";
        passwordChange.innerText = "";
        window.location.href = "dashboard.html";

    } else {
        passwordError.innerText = "Invalid username or password";
        passwordChange.innerText = "Change password";
    }
}

        
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let displayName = document.getElementById("displayName");
    displayName.innerHTML = `<h1>HELLO : ${currentUser.text}</h1>`;




