const conection = require('../database/db');

exports.show = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    let v_query = "";
    if (req.params.priority == '4' && req.params.state == '4')
        v_query = "select re.*, CONCAT(CONCAT(pr.primer_nombre,' '), pr.apellido_paterno) as proveedor from requerimiento as re left join proveedor as pr on re.codigo_proveedor = pr.codigo where re.fecha_pedido between '" + req.params.desde + "' and '" + req.params.hasta + "' ORDER by re.codigo desc;";
    else if (req.params.priority == '4')
        v_query = "select re.*, CONCAT(CONCAT(pr.primer_nombre,' '), pr.apellido_paterno) as proveedor from requerimiento as re left join proveedor as pr on re.codigo_proveedor = pr.codigo where re.fecha_pedido between '" + req.params.desde + "' and '" + req.params.hasta + "' AND re.estado=" + req.params.state + " ORDER by re.codigo desc;";
    else if (req.params.state == '4')
        v_query = "select re.*, CONCAT(CONCAT(pr.primer_nombre,' '), pr.apellido_paterno) as proveedor from requerimiento as re left join proveedor as pr on re.codigo_proveedor = pr.codigo where re.fecha_pedido between '" + req.params.desde + "' and '" + req.params.hasta + "' AND re.urgencia='" + req.params.priority + "' ORDER by re.codigo desc;";
    else
        v_query = "select re.*, CONCAT(CONCAT(pr.primer_nombre,' '), pr.apellido_paterno) as proveedor from requerimiento as re left join proveedor as pr on re.codigo_proveedor = pr.codigo where re.fecha_pedido between '" + req.params.desde + "' and '" + req.params.hasta + "' AND re.urgencia='" + req.params.priority + "'  AND re.estado=" + req.params.state + " ORDER by re.codigo desc;";
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

    const descripcion = req.body.descripcion;
    const urgencia = req.body.urgencia;
    const pedido = req.body.pedido;
    const costo = req.body.costo;
    const fecha_pedido = req.body.fecha_pedido;
    let fecha_entrega = null;
    if (req.body.fecha_entrega)
        fecha_entrega = req.body.fecha_entrega;
    const estado = req.body.estado;
    const codigo_proveedor = req.body.proveedor;

    conection.query('INSERT INTO requerimiento SET ?;', { descripcion, urgencia, pedido, costo, fecha_pedido, fecha_entrega, estado, codigo_proveedor }, (error, results) => {
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
    const urgencia = req.body.urgencia;
    const pedido = req.body.pedido;
    const costo = req.body.costo;
    const fecha_pedido = req.body.fecha_pedido;
    let fecha_entrega = null;
    if (req.body.fecha_entrega)
        fecha_entrega = req.body.fecha_entrega;
    const estado = req.body.estado;
    const codigo_proveedor = req.body.proveedor;

    const v_query = "UPDATE requerimiento SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { descripcion, urgencia, pedido, costo, fecha_pedido, fecha_entrega, estado, codigo_proveedor }, (error, results) => {
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
    conection.query("DELETE FROM requerimiento where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

