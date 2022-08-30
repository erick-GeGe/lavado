const { json } = require('express');
const express = require('express');
const router = express.Router();

const clientes_crud = require('./controllers/clientes');
const proveedores_crud = require('./controllers/proveedores');
const trabajadores_crud = require('./controllers/trabajadores');
const servicios_crud = require('./controllers/servicios');
const flujos_de_caja_crud = require('./controllers/flujos_de_caja');
const requerimientos_crud = require('./controllers/requerimientos');
const bonos_crud = require('./controllers/bonos');
const adelantos_crud = require('./controllers/adelantos');
const asistencias_crud = require('./controllers/asistencias');
const ordenes_crud = require('./controllers/ordenes');
const auth = require("./controllers/auth");

//login
router.get("/login", (req, res) =>{
    res.setHeader('Content-type','text/html');
    res.sendFile('./public/login.html', { root: __dirname });
});
router.get("/logout", (req,res)=>{
    req.session.destroy(()=>{
        res.send('1');
    });
})
router.post("/auth", auth.authUser);

// Home
router.get("/index", (req, res) =>{
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/home.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});

// Clientes
router.get("/clientes", (req, res) =>{
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/clientes.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/cliente/:order/:search?", clientes_crud.show);
router.get("/carro/:codigo_cliente", clientes_crud.showCars);
router.post("/cliente", clientes_crud.create);
router.post("/carro", clientes_crud.createCar);
router.put("/cliente/:codigo", clientes_crud.update);
router.put("/carro/:codigo", clientes_crud.updateCar);
router.delete("/cliente/:codigo", clientes_crud.eliminate);
router.delete("/carro/:codigo", clientes_crud.eliminateCar);

// Porveedores
router.get("/proveedores", (req, res) =>{
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/proveedores.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/proveedor/:order/:search?", proveedores_crud.show);
router.post("/proveedor", proveedores_crud.create);
router.put("/proveedor/:codigo", proveedores_crud.update);
router.delete("/proveedor/:codigo", proveedores_crud.eliminate);

// Trabajadores
router.get("/trabajadores", (req, res) =>{
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/trabajadores.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/trabajador/:order/:search?", trabajadores_crud.show);
router.post("/trabajador", trabajadores_crud.create);
router.put("/trabajador/:codigo", trabajadores_crud.update);
router.delete("/trabajador/:codigo", trabajadores_crud.eliminate);

// Servicios
router.get("/servicios", (req, res) =>{
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/servicios.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/servicio/:search?", servicios_crud.show);
router.post("/servicio", servicios_crud.create);
router.put("/servicio/:codigo", servicios_crud.update);
router.delete("/servicio/:codigo", servicios_crud.eliminate);

// flujos de caja
router.get("/flujos-de-caja", (req, res) => {
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/flujos-de-caja.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/flujo_de_caja/:desde/:hasta", flujos_de_caja_crud.show);
router.post("/flujo_de_caja", flujos_de_caja_crud.create);
router.put("/flujo_de_caja/:codigo", flujos_de_caja_crud.update);
router.delete("/flujo_de_caja/:codigo", flujos_de_caja_crud.eliminate);

// requerimientos
router.get("/requerimientos", (req, res) => {
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/requerimientos.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/requerimiento/:priority/:state/:desde/:hasta", requerimientos_crud.show);
router.post("/requerimiento", requerimientos_crud.create);
router.put("/requerimiento/:codigo", requerimientos_crud.update);
router.delete("/requerimiento/:codigo", requerimientos_crud.eliminate);

// bonos
router.get("/bonos", (req, res) => {
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/bonos.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/bono/:desde/:hasta/:trabajador?", bonos_crud.show);
router.post("/bono", bonos_crud.create);
router.put("/bono/:codigo", bonos_crud.update);
router.delete("/bono/:codigo", bonos_crud.eliminate); 

// adelantos
router.get("/adelantos", (req, res) => {
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/adelantos.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/adelanto/:desde/:hasta/:trabajador?", adelantos_crud.show);
router.post("/adelanto", adelantos_crud.create);
router.put("/adelanto/:codigo", adelantos_crud.update);
router.delete("/adelanto/:codigo", adelantos_crud.eliminate); 

// asistencia
router.get("/asistencias", (req, res) => {
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/asistencias.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/asistencia/:desde/:hasta/:trabajador?", asistencias_crud.show);
router.post("/asistencia", asistencias_crud.create);
router.put("/asistencia/:codigo", asistencias_crud.update);
router.delete("/asistencia/:codigo", asistencias_crud.eliminate); 

// ordenes
router.get("/ordenes", (req, res) => {
    if(req.session.loggedin)
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/ordenes.html', { root: __dirname });
    }
    else
    {
        res.setHeader('Content-type','text/html');
        res.sendFile('./public/no-login.html', { root: __dirname });
    }
});
router.get("/orden/:desde/:hasta/:codigo_cliente", ordenes_crud.show);
router.get("/orden-servicio/:codigo", ordenes_crud.showOrdenesServicios);
router.get("/orden-last", ordenes_crud.showOrdenLast);
router.post("/orden", ordenes_crud.create);
router.post("/orden-servicio", ordenes_crud.createOrdenServicio);
router.put("/orden/:codigo", ordenes_crud.update);
router.put("/orden-servicio/:codigo", ordenes_crud.updateOrdenServicio);
router.delete("/orden/:codigo", ordenes_crud.eliminate); 
router.delete("/orden-servicio/:codigo", ordenes_crud.eliminateOrdenServicio); 




module.exports = router;