const validarFormularioRol = () =>{
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    
    let errorNombre = '';
    let errormodulo='';
 
    const nombre = document.getElementById('nombre').value
   

    if(!expresionNombre.test(nombre)){
        errorNombre = 'El nombre debe contener unicamente letras'
    }

    document.getElementById('nombreError').innerText = errorNombre
}


document.querySelector('#btnCrearRol')
.addEventListener('click',() => validarFormularioRol())