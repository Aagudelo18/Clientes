const validarPedido = () => {

    const expresionNombreCliente = /^[a-zA-Z]+ *[a-zA-Z]*$/;
    const expresionNombreRecibe = /^[a-zA-Z]+ *[a-zA-Z]*$/;
    const expresionTelefono = /^[a-zA-Z]+ *[a-zA-Z]*$/;
    const expresionDireccion = /^[a-zA-Z]+ *[a-zA-Z]*$/;
    const expresionProducto = /^[a-zA-Z]+ *[a-zA-Z]*$/;
    const expresionCantidad = /^[0-9]{1,10}$/; 
    const expresionFechaEntrega = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;


    
    const nombreCliente = document.getElementById('nombreCliente').value
    const nombreRecibe = document.getElementById('nombreRecibe').value
    const telefono = document.getElementById('telefono').value
    const direccion = document.getElementById('direccion').value
    const producto = document.getElementById('producto').value
    const cantidad = document.getElementById('cantidad').value
    const fechaEntrega = document.getElementById('fechaEntrega').value
    let erroresPedido =' ';

    
    if(!expresionNombreCliente.test(nombreCliente)){
        erroresPedido += 'Ingresar solo letras en el Nombre.<br>'; 
    }
    if(!expresionNombreRecibe.test(nombreRecibe)){
        erroresPedido += 'Ingresar solo letras en el Nombre.<br>'; 
    }
    if(!expresionTelefono.test(telefono)){
        erroresPedido += 'Ingresar solo numeros en el telefono.<br>'; 
    }
    if(!expresionDireccion.test(direccion)){
        erroresPedido += 'Ingresar la direccion.<br>'; 
    }
    if(!expresionProducto.test(producto)){
        erroresPedido += 'Ingresar solo números el producto.<br>';
    }
    if(!expresionCantidad.test(cantidad)){
        erroresPedido += 'Ingresar solo números en la cantidad.<br>';
    }
    if(!expresionFechaEntrega.test(fechaEntrega)){
        erroresPedido += 'Ingresar fecha con el formulario dd/mes/año.<br>';
    }

    const alertElement = document.getElementById("erroresPedidos")


    if (erroresPedido.length > 0){
        alertElement.style.display = "block";
        alertElement.innerHTML = erroresPedido;
    }else{
        alertElement.style.display = "none";
    }
}

document.querySelector('#btnRegistrarPedido')
.addEventListener('click' ,  validarPedido)