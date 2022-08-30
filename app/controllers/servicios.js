const conection = require('../database/db');

exports.show = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    let v_query = "";
    if (req.params.search)
        v_query = "select * from servicio where nombre LIKE '" + req.params.search + "%' OR costo LIKE '" + req.params.search + "%';";
    else
        v_query = "select * from servicio;";

    conection.query(v_query, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
};

exports.create = (req, res) => {
    res.setHeader('Content-type', 'text/plain');

    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const costo = req.body.costo;

    conection.query('INSERT INTO servicio SET ?;', { nombre, descripcion, costo}, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.send('agregado');
        }
    });
};

exports.update = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    const codigo = req.params.codigo;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const costo = req.body.costo;

    const v_query = "UPDATE servicio SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { nombre, descripcion, costo}, (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('service updated');
        }
    });
};

exports.eliminate = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    const codigo = req.params.codigo;
    // console.log(codigo);
    conection.query("DELETE FROM servicio where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

