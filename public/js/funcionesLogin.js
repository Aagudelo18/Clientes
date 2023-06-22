const validarFormularioLogin = () => {

    const expresionCorreo = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    
    let errorCorreo = '';
    let errorContraseña = '';
    let errorCorreoContraseña = '';

    let correo = document.getElementById('correo').value
    let contraseña=document.getElementById("contraseña").value;


    if(!expresionCorreo.test(correo)){
        errorCorreo = 'El correo debe tener un formato usuario@dominio.com'
    }

    if(correo==""){
        errorCorreo = 'Ingrese el correo'
    }
    if(contraseña==""){
        errorContraseña = 'Ingrese la contraseña'
    }

    if(correo=="parisina@gmail.com" && contraseña=="1234"){
        window.location.href="/home"
    } else{
        errorCorreoContraseña = 'El usuario o contraseña ingresados son incorrectos'
    }

    document.getElementById('correoError').innerText = errorCorreo
    document.getElementById('contraseñaError').innerText = errorContraseña
    document.getElementById('correoContraseñaError').innerText = errorCorreoContraseña

}


document.querySelector('#botonLogin')
.addEventListener('click',() => validarFormularioLogin())