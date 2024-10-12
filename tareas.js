
// Seleccionamos los elementos necesarios
const listaTareas = document.getElementById('listaTareas');
const formTarea = document.getElementById('formTarea');
const nombreTareaInput = document.getElementById('nombreTarea');
const descripcionTareaInput = document.getElementById('descripcionTarea');

// Inicializamos las tareas (vacío al inicio)
let tareas = [];

// Función para renderizar la lista de tareas
function renderizarTareas() {
    listaTareas.innerHTML = ''; // Limpiamos la lista
    
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center flex-wrap`;

        // Contenedor de texto de la tarea
        const divTexto = document.createElement('div');
        const spanNombre = document.createElement('span');
        spanNombre.textContent = tarea.nombre;
        const spanDescripcion = document.createElement('small');
        spanDescripcion.textContent = tarea.descripcion;
        spanDescripcion.className = 'd-block';

        // Aplicamos estilos según el estado de la tarea
        if (tarea.estado === 'iniciada') {
            li.classList.add('bg-success', 'text-white');
            spanNombre.classList.add('text-white');
            spanDescripcion.classList.add('text-white');
        } else if (tarea.estado === 'progreso') {
            li.classList.add('bg-warning', 'text-dark');
            spanNombre.classList.add('text-dark');
            spanDescripcion.classList.add('text-dark');
        } else if (tarea.estado === 'finalizada') {
            li.classList.add('bg-danger', 'text-white');
            spanNombre.classList.add('text-white');
            spanDescripcion.classList.add('text-white');
        }

        divTexto.appendChild(spanNombre);
        divTexto.appendChild(spanDescripcion);

        // Botones de acción
        const divBotones = document.createElement('div');

        // Botón de iniciar tarea
        const btnIniciar = document.createElement('button');
        btnIniciar.className = 'btn btn-success me-2';
        btnIniciar.textContent = 'Iniciar tarea';
        btnIniciar.addEventListener('click', () => cambiarEstadoTarea(tarea.id, 'iniciada'));

        // Botón de tarea en progreso
        const btnProgreso = document.createElement('button');
        btnProgreso.className = 'btn btn-warning me-2';
        btnProgreso.textContent = 'Tarea en progreso';
        btnProgreso.addEventListener('click', () => cambiarEstadoTarea(tarea.id, 'progreso'));

        // Botón de finalizar tarea
        const btnFinalizar = document.createElement('button');
        btnFinalizar.className = 'btn btn-danger me-2';
        btnFinalizar.textContent = 'Finalizar tarea';
        btnFinalizar.addEventListener('click', () => cambiarEstadoTarea(tarea.id, 'finalizada'));

        // Botón de eliminar tarea (negro con ícono)
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn btn-dark';
        btnEliminar.innerHTML = '<i class="bi bi-trash"></i>'; // Ícono de basura
        btnEliminar.addEventListener('click', () => eliminarTarea(tarea.id));

        divBotones.appendChild(btnIniciar);
        divBotones.appendChild(btnProgreso);
        divBotones.appendChild(btnFinalizar);
        divBotones.appendChild(btnEliminar);

        li.appendChild(divTexto);
        li.appendChild(divBotones);
        listaTareas.appendChild(li);
    });
}

// Función para cambiar el estado de la tarea
function cambiarEstadoTarea(id, nuevoEstado) {
    tareas = tareas.map(tarea => 
        tarea.id === id ? { ...tarea, estado: nuevoEstado } : tarea
    );
    renderizarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    renderizarTareas();
}

// Función para agregar una nueva tarea con nombre y descripción
formTarea.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombreTarea = nombreTareaInput.value.trim();
    const descripcionTarea = descripcionTareaInput.value.trim();

    if (nombreTarea && descripcionTarea) {
        const nuevaTarea = { id: Date.now(), nombre: nombreTarea, descripcion: descripcionTarea, estado: 'nueva' };
        tareas.push(nuevaTarea);
        renderizarTareas();
        
        // Limpiamos el formulario y cerramos el modal
        nombreTareaInput.value = '';
        descripcionTareaInput.value = '';
        const modal = bootstrap.Modal.getInstance(document.getElementById('tareaModal'));
        modal.hide();
    }
});
