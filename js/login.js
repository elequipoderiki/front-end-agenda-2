// var user = 'riki@gmail.com'

function salir() {
    sessionStorage.removeItem('mysesion')
    //limpiar nombre y opcion de salir de sesion
    $('#usuarioActual').text('')
    $('#logOut').text('')
    
    // $('#main-box').load("login.html") /******************** */
    // window.location.href = 'index.html'

}

function registrar() {
    $('#main-box').load("register.html")
}

$("form").submit(async function(e) {

    e.preventDefault();
    if (validateForm()) {
        $('#login-error').text('Espere por favor')

        usuarioActual = $(this).find('input[name="email"]').val()
        plainPassword = $(this).find('input[name="password"]').val()
        // si existe en  base de datos navegar a sus tareas
        userName = '';
        endpointGetUser = `https://todolistapi2.azurewebsites.net/users/${usuarioActual}`
        
        await axios.get(endpointGetUser)
            .then(function (response) {
                userName = response.data.nombre
            }).catch( function(err) {
                console.log(err.message);
                $('#login-error').text('Credenciales no válidas. Regístrese')
            })

        if (userName) {
            // checkear password
            endpointCheckPass = `https://todolistapi2.azurewebsites.net/users/checkpassword/${usuarioActual}/${plainPassword}`

            await axios.get(endpointCheckPass).then(function (response) {
                if(response.data.isValid) {
                    // guardarlo en session storage
                    sessionStorage.setItem('mysesion',usuarioActual)
                    //pintar nombre y opcion de salir de sesion
                    $('#usuarioActual').text(userName)
                    $('#logOut').text('Log Out')
    
                    // $('#main-box').load("tareas.html") //***************** */
                    window.location.href = 'tareas.html'
                    // return true
                }   else {
                    $('#login-error').text('Credenciales no válidas. Regístrese')
                }                     
                
            }).catch( function(err) {
                console.log(err.message);
                $('#login-error').text('Credenciales no válidas. Regístrese')
            })

        }         
  
    } 
})
