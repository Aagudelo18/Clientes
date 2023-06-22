const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

const puerto = 8082

//Servidor de contenido estatico
app.use(express.static('public'))

//Configuracion de las vistas hbs
app.set('views',path.join(__dirname+'/public/views'))
app.set('view engine','hbs')

//Configuracion del directorio que guardara los archivos partials hbs
hbs.registerPartials(__dirname+'/public/views/partials');

app.get('/', (req,res) => {
    res.render('login')
})

app.get('/home', (req,res) => {
    res.render('modulos/dasboard/home')
})

app.get('/roles', (req,res) => {
    res.render('modulos/roles/roles')
})

app.get('/crearRol', (req,res) => {
    res.render('modulos/roles/crearRol')
})

app.get('/usuarios', (req,res) => {
    res.render('modulos/usuarios/usuarios')
})

app.get('/crear-usuario', (req,res) => {
    res.render('modulos/usuarios/CrearUsuarios',
    )
})
app.get('/empleados', (req,res) => {
    res.render('modulos/empleado/empleados',
    )
})

app.get('/crearEmpleado', (req,res) => {
    res.render('modulos/empleado/crearEmpleados',
    )
})

app.get('/clientes', (req,res) => {
    res.render('modulos/clientes/clientes',
    )
})

app.get('/crearCliente', (req,res) => {
    res.render('modulos/clientes/crearCliente',
    )
})

app.get('/categorias', (req,res) => {
    res.render('modulos/categorias/categorias',
    )
})

app.get('/crear-categoria', (req,res) => {
    res.render('modulos/categorias/crearCategoria',
    )
})

app.get('/productos', (req,res) => {
    res.render('modulos/productos/productos',
    )
})

app.get('/crear-producto', (req,res) => {
    res.render('modulos/productos/crearProducto',
    )
})





app.get('/orden_produccion', (req,res) => {
    res.render('modulos/orden_produccion/orden_produccion')
})

app.get('/ventas', (req,res) => {
    res.render('modulos/ventas/ventas')
})







app.listen(puerto, () => {
    console.log(`Escuchando por el puerto ${puerto}`)
})