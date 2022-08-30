const conection = require('../database/db');

exports.show = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    let v_query = "";
    if (req.params.trabajador)
        v_query = "select adelanto.*,  CONCAT(CONCAT(tr.primer_nombre,' '), tr.apellido_paterno) as trabajador from adelanto left join trabajador as tr on adelanto.codigo_trabajador=tr.codigo where fecha between '" + req.params.desde + "' and '" + req.params.hasta + "' AND codigo_trabajador=" + req.params.trabajador + " ORDER by adelanto.codigo desc;";
    else
        v_query = "select adelanto.*,  CONCAT(CONCAT(tr.primer_nombre,' '), tr.apellido_paterno) as trabajador from adelanto left join trabajador as tr on adelanto.codigo_trabajador=tr.codigo where fecha between '" + req.params.desde + "' and '" + req.params.hasta + "' ORDER by adelanto.codigo desc;";
    // console.log(v_query);
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

    const cantidad = req.body.cantidad;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const codigo_trabajador = req.body.codigo_t;

    conection.query('INSERT INTO adelanto SET ?;', { cantidad, descripcion, fecha, codigo_trabajador }, (error, results) => {
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

    const cantidad = req.body.cantidad;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const codigo_trabajador = req.body.codigo_t;

    const v_query = "UPDATE adelanto SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { cantidad, descripcion, fecha, codigo_trabajador }, (error, results) => {
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
    conection.query("DELETE FROM adelanto where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

