const conection = require('../database/db');

exports.show = (req, res) => {
    if (!req.session.loggedin)
        return

    res.setHeader('Content-type', 'text/json');
    let v_query = "select ord.*,CONCAT(CONCAT(CONCAT(CONCAT(cl.primer_nombre,' '), cl.segundo_nombre),' '),cl.apellido_paterno) as cliente,  ser.nombre as servicio, car.placa as carro, orser.codigo as codigo_ord_ser from orden as ord left join orden_servicio as orser on ord.codigo = orser.codigo_orden left join servicio as ser on orser.codigo_servicio=ser.codigo left join carro as car on orser.codigo_auto=car.codigo left join cliente as cl on ord.codigo_cliente=cl.codigo ";
    if (req.params.codigo_cliente != 0) {

        v_query += "where ord.codigo_cliente=" + req.params.codigo_cliente + " and ord.fecha between ' " + req.params.desde + "' and '" + req.params.hasta + "' ";
    }
    else {
        v_query += "where ord.fecha between ' " + req.params.desde + "' and '" + req.params.hasta + "' ";
    }

    v_query += "ORDER by ord.codigo desc;";
    // const v_query = "call showClients('" + req.params.order + "','" + v_search + "')";
    conection.query(v_query, (error, results) => {
        if (error) {
            throw error;
        } else {
            const consult_orders = [];
            // extracting the name in only 1 field
            results.forEach(orden => {

                // check if the orden already exists to count the cars
                let repeat = false;
                consult_orders.forEach(n_ordern => {
                    if (n_ordern.codigo == orden.codigo) {
                        repeat = true;
                        n_ordern.servicios.push(orden.servicio);
                        n_ordern.carros.push(orden.carro);
                    }
                });
                // if the orden not already, add
                if (!repeat) {
                    // const nombre = orden.primer_nombre + ' ' + orden.segundo_nombre + ' ' + orden.apellido_paterno + ' ' + orden.apellido_materno
                    const new_order = { 'codigo': orden.codigo, 'cliente': orden.cliente, 'tipo_pago':orden.tipo_pago, 'consumo_total': orden.consumo_total, 'fecha': orden.fecha, 'hora': orden.hora, "codigo_cliente": orden.codigo_cliente, "servicios": [orden.servicio], "carros": [orden.carro], "codigo_ord_ser": orden.codigo_ord_ser };
                    consult_orders.push(new_order);
                }
            });
            res.send(consult_orders);
        }
    });
};

exports.showOrdenesServicios = (req, res) => {
    if (!req.session.loggedin)
        return

    const orden_id = req.params.codigo;
    let v_query = "select * from orden_servicio where codigo_orden=" + orden_id + ";";
    conection.query(v_query, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
};

exports.showOrdenLast = (req, res) => {
    if (!req.session.loggedin)
        return

    let v_query = "select max(codigo) as max from orden;";
    conection.query(v_query, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
};

exports.create = (req, res) => {
    if (!req.session.loggedin)
        return

    res.setHeader('Content-type', 'text/plain');

    const consumo_total = req.body.consumo_total;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const tipo_pago = req.body.tipo_pago;
    const codigo_cliente = req.body.codigo_cliente;

    conection.query('INSERT INTO orden SET ?', { consumo_total, fecha, tipo_pago, hora, codigo_cliente }, (error, results) => {
        if (error) {
        } else {
            res.send('agregado');
        }
    });
};

exports.createOrdenServicio = (req, res) => {
    if (!req.session.loggedin)
        return

    res.setHeader('Content-type', 'text/plain');

    const codigo_orden = req.body.codigo_orden;
    const codigo_servicio = req.body.codigo_servicio;
    const codigo_auto = req.body.codigo_auto;

    conection.query('INSERT INTO orden_servicio SET ?', { codigo_orden, codigo_servicio, codigo_auto }, (error, results) => {
        if (error) {
        } else {
            res.send('agregado');
        }
    });
};

exports.update = (req, res) => {
    if (!req.session.loggedin)
        return

    res.setHeader('Content-type', 'text/json');
    const codigo = req.params.codigo;

    const consumo_total = req.body.consumo_total;
    const fecha = req.body.fecha;
    const tipo_pago = req.body.tipo_pago;
    const hora = req.body.hora;
    const codigo_cliente = req.body.codigo_cliente;

    const v_query = "UPDATE orden SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { consumo_total, fecha, tipo_pago, hora, codigo_cliente }, (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('client updated');
        }
    });
};

exports.updateOrdenServicio = (req, res) => {
    if (!req.session.loggedin)
        return

    res.setHeader('Content-type', 'text/json');
    const codigo = req.params.codigo;

    const codigo_orden = req.body.codigo_orden;
    const codigo_servicio = req.body.codigo_servicio;
    const codigo_auto = req.body.codigo_auto;

    const v_query = "UPDATE orden_servicio SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { codigo_orden, codigo_servicio, codigo_auto }, (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('client updated');
        }
    });
};


exports.eliminate = (req, res) => {
    if (!req.session.loggedin)
        return

    res.setHeader('Content-type', 'text/plain');
    const codigo = req.params.codigo;
    conection.query("DELETE FROM orden where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

exports.eliminateOrdenServicio = (req, res) => {
    if (!req.session.loggedin)
        return

    res.setHeader('Content-type', 'text/plain');
    const codigo = req.params.codigo;
    conection.query("DELETE FROM orden_servicio where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};