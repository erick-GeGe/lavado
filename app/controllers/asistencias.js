const conection = require('../database/db');

exports.show = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    let v_query = "";
    if (req.params.trabajador)
        v_query = "select asis.*,  CONCAT(CONCAT(tr.primer_nombre,' '), tr.apellido_paterno) as trabajador from asistencia_trabajador as asis left join trabajador as tr on tr.codigo=asis.codigo_trabajador where fecha between '" + req.params.desde + "' and '" + req.params.hasta + "' AND codigo_trabajador=" + req.params.trabajador + " ORDER by asis.codigo desc;";
    else
        v_query = "select asis.*,  CONCAT(CONCAT(tr.primer_nombre,' '), tr.apellido_paterno) as trabajador from asistencia_trabajador as asis left join trabajador as tr on tr.codigo=asis.codigo_trabajador where fecha between '" + req.params.desde + "' and '" + req.params.hasta + "' ORDER by asis.codigo desc;";
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

    const asistio = req.body.asistio;
    const hora_inicio = req.body.hora_inicio;
    const hora_fin = req.body.hora_fin;
    const fecha = req.body.fecha;
    const codigo_trabajador = req.body.codigo_t;

    // console.log(asistio, hora_fin, hora_inicio, fecha,codigo_trabajador)

    conection.query('INSERT INTO asistencia_trabajador SET ?;', { asistio, hora_inicio, hora_fin, fecha, codigo_trabajador }, (error, results) => {
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

    const asistio = req.body.asistio;
    const hora_inicio = req.body.hora_inicio;
    const hora_fin = req.body.hora_fin;
    const fecha = req.body.fecha;
    const codigo_trabajador = req.body.codigo_t;

    const v_query = "UPDATE asistencia_trabajador SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { asistio, hora_inicio, hora_fin, fecha, codigo_trabajador }, (error, results) => {
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
    conection.query("DELETE FROM asistencia_trabajador where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

