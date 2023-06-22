const validarFormularioEmpleados = () =>{
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    const expresionDocumento = /^[0-9]{5,15}$/
    const expresionCargo = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    
    let errorNombre = '';
    let errorDocumento = '';
    let errorCargo = '';

    const nombre = document.getElementById('nombre').value
    const documento = document.getElementById('documento').value
    const cargo = document.getElementById('cargo').value


    if(!expresionNombre.test(nombre)){
        errorNombre = 'El nombre debe contener unicamente letras'
    }

    if(!expresionDocumento.test(documento)){
        errorDocumento = 'La documento solo debe contener números'
    }

    if(!expresionCargo.test(cargo)){
        errorCargo= 'El area debe contener unicamente letras'
    }

    document.getElementById('nombreError').innerText = errorNombre
    document.getElementById('documentoError').innerText = errorDocumento
    document.getElementById('cargoError').innerText = errorCargo
};

document.querySelector('#btncrearEmpleado')
.addEventListener('click',() => validarFormularioEmpleados())