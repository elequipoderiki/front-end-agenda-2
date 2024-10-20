function salir() {
    sessionStorage.removeItem('mysesion')
    //limpiar nombre y opcion de salir de sesion
    $('#usuarioActual').text('')
    $('#logOut').text('')
    
    $('#main-box').load("login.html")
}

// Seleccionamos los elementos necesarios
const listaTareas = document.getElementById('listaTareas');
const formTarea = document.getElementById('formTarea');
const nombreTareaInput = document.getElementById('nombreTarea');
const descripcionTareaInput = document.getElementById('descripcionTarea');
const formEditTarea = document.getElementById('formEditTarea');

// Inicializamos las tareas (vacío al inicio)

// Función para renderizar la lista de tareas
function renderizarTareas(tareas) {

    listaTareas.innerHTML = ''; // Limpiamos la lista
    
    tareas.forEach(tarea => {
        const li = document.createElement('div');
        li.className = `card  me-2 mb-2 align-self-start`;

        // Contenedor de texto de la tarea
        const divTexto = document.createElement('div');
        divTexto.className = 'card-body'
        const containerNombre = document.createElement('h5');
        const editCard = document.createElement('a');
        editCard.textContent = tarea.nombre;
        editCard.setAttribute("idTarea", tarea._id);
        editCard.addEventListener("click", function(e) { guardarValoresAEditar(tarea._id, tarea.nombre, tarea.descripcion)})
        editCard.setAttribute("data-bs-toggle", "modal")
        editCard.setAttribute("data-bs-target", "#tareaEditModal")
        containerNombre.className = 'card-title text-center'
        containerNombre.appendChild(editCard)
        const spanDescripcion = document.createElement('p');
        spanDescripcion.textContent = tarea.descripcion;
        spanDescripcion.className = 'card-text';

        const spanKeywords = document.createElement('h6');
        keywords = extractKeywords(tarea.descripcion).join(', ')
        spanKeywords.textContent = 'Keywords: ' + keywords;
        spanKeywords.className = 'card-subtitle mb-3 mt-3'

        li.setAttribute('estado', tarea.estado)        

        // Aplicamos estilos según el estado de la tarea
        if (tarea.estado === 'Pendiente') {
            li.classList.add('bg-success');
            li.classList.add('text-white');

          } else if (tarea.estado === 'En progreso') {
            li.classList.add('text-dark');
            li.classList.add('bg-warning');

        } else if (tarea.estado === 'Completado') {
            li.classList.add('bg-danger');
            li.classList.add('text-white');

            // li.classList.add('visually-hidden');

        }

        divTexto.appendChild(containerNombre);
        divTexto.appendChild(spanDescripcion);
        divTexto.appendChild(spanKeywords)

        // Botones de acción
        const divBotones = document.createElement('div');
        divBotones.className = 'd-flex-column'
        divBotones.id = 'seccionBotones'
        // Botón de iniciar tarea
        const btnIniciar = document.createElement('button');
        btnIniciar.className = 'btn btn-success me-2 mb-2';
        btnIniciar.textContent = 'Pendiente';
        if (tarea.estado == 'Pendiente'){
             btnIniciar.classList.add('border-white')
             btnIniciar.classList.add('border')
        }
        btnIniciar.addEventListener('click', () => cambiarEstadoTarea(tarea._id, 'Pendiente'));

        // Botón de tarea en progreso
        const btnProgreso = document.createElement('button');
        btnProgreso.className = 'btn btn-warning me-2 mb-2';
        btnProgreso.textContent = 'En progreso';
        if (tarea.estado == 'En progreso'){
            btnProgreso.classList.add('border-white')
            btnProgreso.classList.add('border')
       }
        btnProgreso.addEventListener('click', () => cambiarEstadoTarea(tarea._id, 'En progreso'));

        // Botón de finalizar tarea
        const btnFinalizar = document.createElement('button');
        btnFinalizar.className = 'btn btn-danger me-2 mb-2';
        btnFinalizar.textContent = 'Finalizar';
        if (tarea.estado == 'Completado'){
            btnFinalizar.classList.add('border-white')
            btnFinalizar.classList.add('border')
            btnFinalizar.textContent = 'Finalizado'
        } 

        btnFinalizar.addEventListener('click', () => cambiarEstadoTarea(tarea._id, 'Completado'));

        // Botón de eliminar tarea (negro con ícono)
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-dark';
        btnEliminar.innerHTML = '<i class="bi bi-trash"></i>'; // Ícono de basura
        btnEliminar.addEventListener('click', () => eliminarTarea(tarea._id));

        
        divBotones.appendChild(btnIniciar);
        divBotones.appendChild(btnProgreso);
        divBotones.appendChild(btnFinalizar);
        divBotones.appendChild(btnEliminar);
        divTexto.appendChild(divBotones)
        li.appendChild(divTexto);
        listaTareas.appendChild(li);
    });

}

// Función para cambiar el estado de la tarea
function cambiarEstadoTarea(id, nuevoEstado) {

    endpoint = `https://todolistapi2.azurewebsites.net/tasks/edit/${id}`

    axios.put(endpoint, {
        estado: nuevoEstado
    })
        .then(function (response) {
           console.log(response)
            window.location.reload()
                
        
        }).catch( function(err) {
            console.error(err.message);
        })

}

function guardarValoresAEditar(id, nombre, descripcion) {
  campoid = document.getElementById("idEditar")
  campoid.value = id
  const nombreTareaInput = document.getElementById('nombreTareaEdit');
  const descripcionTareaInput = document.getElementById('descripcionTareaEdit');
  nombreTareaInput.value = nombre;
  descripcionTareaInput.value = descripcion;
}

// Función para eliminar una tarea
function eliminarTarea(id) {

    endpoint = `https://todolistapi2.azurewebsites.net/tasks/remove/${id}`
    axios.delete(endpoint)
        .then(function (response) {
            window.location.reload()
                
        
        }).catch( function(err) {
            console.error(err.message);
        })

}

// funcion para obtener las tareas del usuario actual
async function traerTareasUsuario(user) {
    try {
        // traer usuario actual
        endpoint = `https://todolistapi2.azurewebsites.net/tasks/byuser/${user}`;
        
        const response = await axios.get(endpoint)
    
        return response.data
      } catch (err) {
        console.error(err.message);
      }
}


// Función para agregar una nueva tarea con nombre y descripción
formTarea.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = sessionStorage.getItem('mysesion')
    
    const nombreTarea = nombreTareaInput.value.trim();
    const descripcionTarea = descripcionTareaInput.value.trim();
        
    let endpoint = `https://todolistapi2.azurewebsites.net/tasks/add`;
    
    axios.post(endpoint, {
        nombre: nombreTarea,
        descripcion: descripcionTarea,
        usuario: user
        })
        .then(function (response) {
            // Limpiamos el formulario y cerramos el modal
            nombreTareaInput.value = '';
            descripcionTareaInput.value = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('tareaModal'));
            window.location.reload()
                
        
        }).catch( function(err) {
            console.error(err.message);
        })

})


// Función para editar una tarea 
formEditTarea.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombreTareaInput = document.getElementById('nombreTareaEdit');
    const descripcionTareaInput = document.getElementById('descripcionTareaEdit');
    const id = document.getElementById('idEditar').value;

    const user = sessionStorage.getItem('mysesion')
    
    const nombreTarea = nombreTareaInput.value.trim();
    const descripcionTarea = descripcionTareaInput.value.trim();

    // console.log(id, ' ', user, ' ', nombreTarea, ' ', descripcionTarea)
    endpoint = `https://todolistapi2.azurewebsites.net/tasks/edit/${id}`
    axios.put(endpoint, {
        nombre: nombreTarea,
        descripcion: descripcionTarea,
        usuario: user
        })
        .then(function (response) {
            // Limpiamos el formulario y cerramos el modal
            nombreTareaInput.value = '';
            descripcionTareaInput.value = '';
            const modal = bootstrap.Modal.getInstance(document.getElementById('tareaModal'));
            window.location.reload()
                        
        }).catch( function(err) {
            console.error(err.message);
        })

})

function seleccionarPorEstado(estadoSeleccionado) {
  cards = document.getElementsByClassName('card')

  for (let card of cards) {
    card.classList.remove('visually-hidden')

    if (estadoSeleccionado && card.getAttribute('estado') != estadoSeleccionado)
      card.classList.add('visually-hidden')
  }


}

async function renderTasks() {
    user = sessionStorage.getItem('mysesion')

    tareas = await traerTareasUsuario(user)

    renderizarTareas(tareas)
}

renderTasks()
