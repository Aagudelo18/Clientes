const validarFormularioCliente = () =>{
    const expresionNumeroDocumento = /^[0-9]{5,15}$/
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    const expresionCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    const expresionCelular = /^[0-9]{10}$/
    
    let errorNumeroDocumento ='';
    let errorNombre = '';
    let errorCorreo = '';
    let errorDireccion = '';
    let errorCelular = '';
    let errortipoCliente = '';
    let errorEstado = '';

    const numeroDocumento = document.getElementById('numeroDocumento').value
    const nombre = document.getElementById('nombre').value
    const correo = document.getElementById('correo').value
    const direccion = document.getElementById('direccion').value
    const celular = document.getElementById('celular').value
    const tipoCliente = document.getElementById('tipoCliente').value
    const estado = document.getElementById('estado').value

    if(numeroDocumento ===''){
        errorNumeroDocumento = 'El numero de documento es obligatorio'
    }else if(!expresionNumeroDocumento.test(numeroDocumento)){
        errorNumeroDocumento = 'El numero de documento solo se podra ingresar numero sin puntos o signos'
    }

    if(nombre === ''){
        errorNombre = 'El nombre es obligatorio'
    }else if(!expresionNombre.test(nombre)){
        errorNombre = 'El nombre debe contener unicamente letras'
    }
    if(correo === ''){
        errorCorreo = 'El correo es obligatorio'
    }else if(!expresionCorreo.test(correo)){
        errorCorreo = 'El correo debe llevar @ y terminar en .com, '
    }
    if(direccion===''){
        errorDireccion = 'La direccion es obligatoria'
    }
    if(celular === ''){
        errorCelular = 'El numero de celular necesario'
    }else if(!expresionCelular.test(celular)){
        errorCelular = 'El numero de celular debe contener unicamente números'
    }
    if(tipoCliente ===''){
        errortipoCliente = 'Debes selecionar un tipo de cliente'
    }
    if(estado ===''){
        errorEstado = 'El estado es requerido'
    }

    document.getElementById('numeroDocumentoError').innerText = errorNumeroDocumento
    document.getElementById('nombreError').innerText = errorNombre
    document.getElementById('correoError').innerText = errorCorreo
    document.getElementById('direccionError').innerText = errorDireccion
    document.getElementById('celularError').innerText = errorCelular
    document.getElementById('tipoClienteError').innerText = errortipoCliente
    document.getElementById('estadoError').innerText = errorEstado

    if (errorNumeroDocumento === '' && errorNombre === ''&& errorCorreo === ''
    && errorDireccion === ''&& errorCelular === ''&& errortipoCliente === '' && errorEstado === '') {
        return true; // Validación exitosa
    } else {
        return false; // Validación fallida
    }
}

//al desplegar en el servidor colocar la base de datos del servidor 
//url de la api.
//Al desplegarla en el servidor colocar la api del servidor
const url = 'https://modulo-clientes.onrender.com/api/clientes'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //obtener respuesta y convertirla a json
    .then(function(data) {
        let listaClientes = data.clientes
        return listaClientes.map(function(clientes) {
            respuesta += `<tr><td>${clientes.numeroDocumento}</td>`+
                    `<td>${clientes.nombre}</td>`+
                    `<td>${clientes.correo}</td>`+
                    `<td>${clientes.direccion}</td>`+
                    `<td>${clientes.celular}</td>`+
                    `<td>${clientes.tipoCliente}</td>`+
                    `<td><div class="custom-control custom-switch text-center">
                    <input type="checkbox" class="custom-control-input" id="check${clientes.id}" ${clientes.estado ? 'checked' : ''}>
                    <label class="custom-control-label" for="check${clientes.id}"></label>
                    </div></td>`+
                    `<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick='editar(${JSON.stringify(clientes)})'>Editar</button> 
                    <button type="button" class="btn btn-danger" onclick='eliminar(${JSON.stringify(clientes)})'>Eliminar</button></td></tr>`
            body.innerHTML = respuesta

        })
    })
}

const registrar = async () => {

    let _numeroDocumento = document.getElementById('numeroDocumento').value
    let _nombre = document.getElementById('nombre').value
    let _correo = document.getElementById('correo').value
    let _direccion = document.getElementById('direccion').value
    let _celular = document.getElementById('celular').value
    let _tipoCliente = document.getElementById('tipoCliente').value
    let _estado = document.getElementById('estado').value


        let _clientes = {
            numeroDocumento: _numeroDocumento,
            nombre: _nombre,
            correo: _correo,
            direccion: _direccion,
            celular:_celular,
            tipoCliente:_tipoCliente,
            estado: _estado
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_clientes),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            console.log(json.msg)
            //alert(json.msg)//Mensaje que retorna la API
            Swal.fire(
                json.msg,
                '',
                'success'
              )
        })
}

const editar = (clientes) => {
    document.getElementById('numeroDocumento').value=''
    document.getElementById('nombre').value=''
    document.getElementById('correo').value=''
    document.getElementById('direccion').value=''
    document.getElementById('celular').value=''
    document.getElementById('tipoCliente').value=''
    document.getElementById('estado').value=''

    document.getElementById('numeroDocumento').value=clientes.numeroDocumento
    document.getElementById('nombre').value=clientes.nombre
    document.getElementById('correo').value=clientes.correo
    document.getElementById('direccion').value=clientes.direccion
    document.getElementById('celular').value=clientes.celular
    document.getElementById('tipoCliente').value=clientes.tipoCliente
    document.getElementById('estado').value=clientes.estado
}

const actualizar = async () => {

    let _numeroDocumento = document.getElementById('numeroDocumento').value
    let _nombre = document.getElementById('nombre').value
    let _correo = document.getElementById('correo').value
    let _direccion = document.getElementById('direccion').value
    let _celular = document.getElementById('celular').value
    let _tipoCliente = document.getElementById('tipoCliente').value
    let _estado = document.getElementById('estado').value

        let _clientes = {
            numeroDocumento: _numeroDocumento,
            nombre: _nombre,
            correo: _correo,
            direccion: _direccion,
            celular:_celular,
            tipoCliente:_tipoCliente,
            estado: _estado
        }
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_clientes),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            Swal.fire(
                json.msg,
                '',
                'success'
              ).then(() => {
                    location.reload();//Para recargar la pagina
                });
        })
}

const eliminar = (id) => {
    Swal.fire({
        title: '¿Está seguro de eliminar el cliente?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let clientes = {
                _id: id
            };
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(clientes),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then((resp) => resp.json())
            .then(json => {
                Swal.fire(
                    json.msg,//mensaje que retorna la API
                    '',
                    'success'
                ).then(() => {
                    location.reload();//Para recargar la pagina
                });
            });
        }
    });
};

//document.querySelector('#btnCrearCliente').addEventListener('click', registrar());

//document.querySelector('#btnCrearCliente').addEventListener('click', registrar)
//document.querySelector('#btnActualizarCliente').addEventListener('click', 
  //  actualizar())
  
    // Tu código aquí
    if (document.querySelector('#btnCrearCliente')) {
      document.querySelector('#btnCrearCliente').addEventListener('click', () => {
        if (validarFormularioCliente()) {
          registrar();
        }
      });
    }
  
    if (document.querySelector('#btnActualizarCliente')) {
        document.querySelector('#btnActualizarCliente').addEventListener('click', () => {
          if (validarFormularioCliente()) {
            actualizar();
          }
        });
      }

   

  

