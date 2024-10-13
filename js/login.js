// var user = 'riki@gmail.com'

function validateForm() {
    // const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
     
    const emailError = document.getElementById(
        "email-error"
    );
    const passwordError = document.getElementById(
        "password-error"
    );
     

    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    if (email === "" || !email.includes("@")) {
        emailError.textContent =
            "Por favor ingrese un email válido.";
        isValid = false;
    }

    if (password === "" || password.length < 6) {
        passwordError.textContent =
            "Por favor ingrese password con al menos 6 caracteres.";
        isValid = false;
    }

    return isValid;

}

$("form").submit(function(e) {

	    e.preventDefault();
		if (validateForm()) {
			user = $(this).find('input[name="email"]').val()
			// console.log(user)
	        $('#main-box').load("tareas.html")
		} 
})
