
function salir() {
    sessionStorage.removeItem('userData')
    //limpiar nombre y opcion de salir de sesion
    $('#usuarioActual').text('')
    $('#logOut').text('')
    
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
        // userName = '';
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
                    userData = {'name': userName, 'email': usuarioActual}
                    sessionStorage.setItem('userData',JSON.stringify(userData))
                    //pintar nombre y opcion de salir de sesion
                    $('#logOut').text('Log Out')
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
