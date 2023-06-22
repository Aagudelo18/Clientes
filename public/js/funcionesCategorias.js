const validarFormularioCategorias = () =>{
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    const expresionDescripcion = /^\b[a-zA-ZñÑ]+(?:\s+\b[a-zA-ZñÑ]+)*\.?\b$/
    
    let errorNombre = '';
    let errorDescripcion = '';

    const nombre = document.getElementById('nombre').value
    const descripcion = document.getElementById('descripcion').value


    if(!expresionNombre.test(nombre)){
        errorNombre = 'El nombre debe contener unicamente letras'
    }

    if(!expresionDescripcion.test(descripcion)){
        errorDescripcion = 'La descripción debe contener unicamente letras'
    }

    document.getElementById('nombreError').innerText = errorNombre
    document.getElementById('descripcionError').innerText = errorDescripcion
}


document.querySelector('#btnCrearCategoria')
.addEventListener('click',() => validarFormularioCategorias())