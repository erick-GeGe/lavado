const conection = require('../database/db');

exports.show = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    let v_query = "";

    v_query = "select * from flujo_de_caja where fecha between '" + req.params.desde + "' and '" + req.params.hasta + "' ORDER by codigo desc;";
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

    const descripcion = req.body.descripcion;
    const valor = req.body.valor;
    const hora = req.body.hora;
    const fecha = req.body.fecha;
    const tipo_pago = req.body.tipo_pago;

    conection.query('INSERT INTO flujo_de_caja SET ?;', { descripcion, valor, hora, fecha, tipo_pago }, (error, results) => {
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
    const descripcion = req.body.descripcion;
    const valor = req.body.valor;
    const hora = req.body.hora;
    const fecha = req.body.fecha;
    const tipo_pago = req.body.tipo_pago;

    const v_query = "UPDATE flujo_de_caja SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { descripcion, valor, hora, fecha, tipo_pago }, (error, results) => {
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
    conection.query("DELETE FROM flujo_de_caja where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

