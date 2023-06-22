const validarFormularioProductos = () =>{
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    const expresionDescripcion = /^\b[a-zA-ZñÑ]+(?:\s+\b[a-zA-ZñÑ]+)*\.?\b$/
    const expresionPrecio = /^[0-9]{5,15}$/
    
    let errorNombre = '';
    let errorDescripcion = '';
    let errorPrecio = '';

    const nombre = document.getElementById('nombre').value
    const descripcion = document.getElementById('descripcion').value
    const precio = document.getElementById('precio').value


    if(!expresionNombre.test(nombre)){
        errorNombre = 'El nombre debe contener unicamente letras'
    }

    if(!expresionDescripcion.test(descripcion)){
        errorDescripcion = 'La descripción debe contener unicamente letras'
    }

    if(!expresionPrecio.test(precio)){
        errorPrecio = 'El precio debe contener unicamente números'
    }

    document.getElementById('nombreError').innerText = errorNombre
    document.getElementById('descripcionError').innerText = errorDescripcion
    document.getElementById('precioError').innerText = errorPrecio
};

document.querySelector('#btnCrearProducto')
.addEventListener('click',() => validarFormularioProductos())