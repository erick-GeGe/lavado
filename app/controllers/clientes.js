const conection = require('../database/db');

exports.show = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    let v_search = "";
    if (req.params.search)
        v_search = req.params.search;

    const v_query = "call showClients('" + req.params.order + "','" + v_search + "')";
    conection.query(v_query, (error, results) => {
        if (error) {
            throw error;
        } else {
            const consult_clients = [];
            // extracting the name in only 1 field
            results[0].forEach(client => {
                // check if the client already exists to count the cars
                let repeat = false;
                consult_clients.forEach(n_client => {
                    if (n_client.codigo == client.codigo) {
                        repeat = true;
                        n_client.cars.push(client.placa);
                    }
                });
                // if the client not already, add
                if (!repeat) {
                    const nombre = client.primer_nombre + ' ' + client.segundo_nombre + ' ' + client.apellido_paterno + ' ' + client.apellido_materno
                    const new_client = { 'codigo': client.codigo, 'name': nombre, 'number': client.telefono, "cars": [client.placa], "orders": client.orders };
                    consult_clients.push(new_client);
                }
            });
            res.send(consult_clients);
        }
    });
};

exports.showCars = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    conection.query("select * from carro where codigo_cliente=?;", (req.params.codigo_cliente), (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
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

    conection.query('INSERT INTO cliente SET ?', { primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            let codigo = "";
            // adding cars
            conection.query("select max(codigo) as max from cliente;", (error, results) => {
                if (error) {
                    throw error;
                } else {
                    codigo = results[0].max;
                    const placas = req.body.placas;
                    // for cars
                    placas.forEach(placa => {
                        conection.query('INSERT INTO carro SET ?', { placa, codigo_cliente: codigo }, (error, results) => {
                            if (error) {
                                throw error;
                            }
                        });
                    });
                    res.send('agregado');
                }
            });
        }
    });
};

exports.createCar = (req, res) => {
    res.setHeader('Content-type', 'text/plain');

    const placa = req.body.placa;
    const codigo_cliente = req.body.codigo_cliente;

    conection.query('INSERT INTO carro SET ?;', { placa, codigo_cliente }, (error, results) => {
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
    const v_query = "UPDATE cliente SET ? where codigo='"+ codigo +"';";
    conection.query(v_query,{primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono}, (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('client updated');
        }
    });
};

exports.updateCar = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    const codigo = req.params.codigo;
    const placa = req.body.placa;
    const v_query = "UPDATE carro SET placa='"+placa+"' where codigo='"+ codigo +"';";
    conection.query(v_query, (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('placa updated');
        }
    });
};

exports.eliminate = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    const codigo = req.params.codigo;
    // console.log(codigo);
    conection.query("DELETE FROM cliente where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

exports.eliminateCar = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    const codigo = req.params.codigo;
    // console.log(codigo);
    conection.query("DELETE FROM carro where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};
