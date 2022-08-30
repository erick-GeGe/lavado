const conection = require('../database/db');

exports.show = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    let v_search = "";
    if (req.params.search)
        v_search = req.params.search;

    const v_query = "call showWorkers('" + req.params.order + "','" + v_search + "')";
    conection.query(v_query, (error, results) => {
        if (error) {
            throw error;
        } else {
            const consult_trabajadores = [];
            // extracting the name in only 1 field
            results[0].forEach(trabajador => {
                const nombre = trabajador.primer_nombre + ' ' + trabajador.segundo_nombre + ' ' + trabajador.apellido_paterno + ' ' + trabajador.apellido_materno
                const new_trabajador = { 'codigo': trabajador.codigo, 'name': nombre, 'telefono': trabajador.telefono, "sueldo": trabajador.sueldo, "descripcion": trabajador.descripcion};
                consult_trabajadores.push(new_trabajador);
            });
            res.send(consult_trabajadores);
        }
    });
};

exports.create = (req, res) => {
    res.setHeader('Content-type', 'text/plain');

    const primer_nombre = req.body.primer_nombre;
    const segundo_nombre = req.body.segundo_nombre;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const telefono = req.body.telefono;
    const sueldo = req.body.sueldo;
    const descripcion = req.body.descripcion;

    conection.query('INSERT INTO trabajador SET ?', { primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, sueldo, descripcion}, (error, results) => {
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
    const primer_nombre = req.body.primer_nombre;
    const segundo_nombre = req.body.segundo_nombre;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const telefono = req.body.telefono;
    const sueldo = req.body.sueldo;
    const descripcion = req.body.descripcion;

    const v_query = "UPDATE trabajador SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, sueldo, descripcion}, (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('worked updated');
        }
    });
};

exports.eliminate = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    const codigo = req.params.codigo;
    // console.log(codigo);
    conection.query("DELETE FROM trabajador where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

