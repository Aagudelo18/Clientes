const validarUsuario = () => {
    event.preventDefault();
    const expresionNombre =  /^[A-Za-z\s]+$/; // Expresión regular para validar que solo existan letras
    const expresionNroIdentificacion = /^\d{1,10}$/;
  
    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo electrónico
  
    const errores = [];
  
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const nroIdentificacionUsuario = document.getElementById('nroIdentificacionUsuario').value;
  
    const emailUsuario = document.getElementById('emailUsuario').value; 
  
  
    // Validar formato de nombre. Funciona
    if (!expresionNombre.test(nombreUsuario)) {
      errores.push('El nombre solo debe contener letras');
    }
    // Validar formato de número de identificación. Funciona
    if (!expresionNroIdentificacion.test(nroIdentificacionUsuario)){
      errores.push('El número de identificación debe contar como máximo 10 dígitos')
    }
  
    // Validar formato de correo electrónico/email. Funciona
    if (!expresionEmail.test(emailUsuario)) {
      errores.push('Correo inválido')
    }
  
  
    // Mostrar errores
    const erroresHTML = errores.map(error => `<li style="color: red;">${error}</li>`).join('');
    document.getElementById('error').innerHTML = erroresHTML;
  };
  
  
  document.querySelector('#btnRegistrar').addEventListener('click',() => validarUsuario());