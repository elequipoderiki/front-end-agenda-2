

function ingresar() {
    $('#main-box').load("login.html")

}

$("form").submit( async function(e) {

    e.preventDefault();
    if (validateForm()) {
        // si existe en  base de datos indicar que elija otro email
        
        $('#login-error').text('Espere por favor')

        usuarioActual = $(this).find('input[name="email"]').val()
        nombre = $(this).find('input[name="nombre"]').val()
        plainPassword = $(this).find('input[name="password"]').val()
        // si existe en  base de datos navegar a sus tareas
        userName = '';
        endpointGetUser = `https://todolistapi2.azurewebsites.net/users/${usuarioActual}`
        
        await axios.get(endpointGetUser)
            .then(function (response) {
                userName = response.data.nombre
            }).catch( function(err) {
                console.log(err.message);
            })

        if (userName) {
            console.log('usuario existente', userName)
            $('#login-error').text('Usuario existente. Elija otras credenciales')
        } else {
            // guardamos en base de datos 

            let endpoint = `https://todolistapi2.azurewebsites.net/users`;
    
            axios.post(endpoint, {
                nombre: nombre,
                email: usuarioActual,
                password: plainPassword
                })
                .then(function (response) {
                        
                    //navegar a pagina de login
                    $('#main-box').load("login.html")
                
                }).catch( function(err) {
                    console.error(err.message);
                })


        }
        
    } 
    
})
