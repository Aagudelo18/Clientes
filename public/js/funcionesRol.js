const validarFormularioRol = () => {
    const expresionCodigo = /^[0-9]{5}$/
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/;

    let errorCodigo='';
    let errorNombre = '';
    let errorEstado = '';
    let errorPermisos = '';

    const codigo =document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const estado = document.getElementById('estado').value
    const checkboxes = document.querySelectorAll('.checkbox-rol');
    const permisos = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);


    if (codigo === '') {
        errorCodigo = 'El codigo del rol es obligatorio';
    } else if (!expresionCodigo.test(codigo)) {
        errorCodigo = 'El codigo debe contener únicamente números';
    }
    if (nombre === '') {
        errorNombre = 'El nombre es obligatorio';
    } else if (!expresionNombre.test(nombre)) {
        errorNombre = 'El nombre debe contener únicamente letras';
    }
    if(estado ===''){
        errorEstado = 'El estado es requerido'
    }
    if (permisos.length === 0) {
        errorPermisos = 'Debes seleccionar al menos un permiso';
    }

    document.getElementById('codigoError').innerText = errorCodigo;
    document.getElementById('nombreError').innerText = errorNombre;
    document.getElementById('estadoError').innerText = errorEstado;
    document.getElementById('permisosError').innerText = errorPermisos;

    if (errorCodigo === '' &&errorNombre === '' && errorPermisos === ''&& errorEstado === '') {
        return true; // Validación exitosa
    } else {
        return false; // Validación fallida
    }
}


const url = 'https://modulo-clientes.onrender.com/api/roles'

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
        let listaRoles = data.roles
        return listaRoles.map(function(roles) {
            respuesta += `<tr><td>${roles.codigo}</td>`+
                    `<td>${roles.nombre}</td>`+
                    `<td>${roles.permisos}</td>`+
                    `<td><div class="custom-control custom-switch text-center">
                    <input type="checkbox" class="custom-control-input" id="check${roles.id}" ${roles.estado ? 'checked' : ''}>
                    <label class="custom-control-label" for="check${roles.id}"></label>
                    </div></td>`+
                    `<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick='editar(${JSON.stringify(roles)})'>Editar</button> 
                    <button type="button" class="btn btn-danger" onclick='eliminar(${JSON.stringify(roles)})'>Eliminar</button></td></tr>`
            body.innerHTML = respuesta

        })
    })
}

const registrar = async () => {
    let _codigo = document.getElementById('codigo').value;
    let _nombre = document.getElementById('nombre').value;
    let _estado = document.getElementById('estado').value;
    
    // Obtener los checkboxes seleccionados
    let _checkboxes = document.querySelectorAll('input[name="roles[]"]:checked');
    let _permisos = Array.from(_checkboxes).map(checkbox => checkbox.value).join(',');
    
    let _roles = {
      codigo: _codigo,
      nombre: _nombre,
      estado: _estado,
      permisos: _permisos,
    };
    
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(_roles),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((resp) => resp.json())
    .then(json => {
      console.log(json.msg);
      Swal.fire(
        json.msg,
        '',
        'success'
      );
    });
  }
  

  const editar = (roles) => {
    document.getElementById('codigo').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('estado').value = '';
  
    document.getElementById('codigo').value = roles.codigo;
    document.getElementById('nombre').value = roles.nombre;
    document.getElementById('estado').value = roles.estado;
  
    let checkboxes = document.querySelectorAll('.checkbox-rol');
    checkboxes.forEach(checkbox => {
      checkbox.disabled = false; // Habilitar checkboxes
      checkbox.checked = roles.permisos.includes(checkbox.value);
    });
  };
  
  

  const actualizar = async () => {
    let _codigo = document.getElementById('codigo').value;
    let _nombre = document.getElementById('nombre').value;
    let _estado = document.getElementById('estado').value;
  
    let checkboxes = document.querySelectorAll('.checkbox-rol:checked');
    let _permisos = Array.from(checkboxes).map(checkbox => checkbox.value);
  
    let _roles = {
      codigo: _codigo,
      nombre: _nombre,
      estado: _estado,
      permisos: _permisos
    };
  
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(_roles),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then((resp) => resp.json())
    .then(json => {
      Swal.fire(
        json.msg,
        '',
        'success'
      ).then(() => {
        location.reload();
      });
    });
  };
  

const eliminar = (id) => {
    Swal.fire({
        title: '¿Está seguro de eliminar el rol?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let roles = {
                _id: id
            };
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(roles),
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
if (document.querySelector('#btnCrearRol')) {
    document.querySelector('#btnCrearRol').addEventListener('click', () => {
      if (validarFormularioRol()) {
        registrar();
      }
    });
  }

  if (document.querySelector('#btnActualizarRol')) {
    document.querySelector('#btnActualizarRol').addEventListener('click', () => {
      if (validarFormularioRol()) {
        actualizar();
      }
    });
  }
  

//document.querySelector('#btnCrearRol').addEventListener('click',() => validarFormularioRol())