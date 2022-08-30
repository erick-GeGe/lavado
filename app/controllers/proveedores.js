const conection = require('../database/db');

exports.show = (req, res) => {
    res.setHeader('Content-type', 'text/json');
    let v_search = "";
    if (req.params.search)
        v_search = req.params.search;

    const v_query = "call showProveedores('" + req.params.order + "','" + v_search + "')";
    conection.query(v_query, (error, results) => {
        if (error) {
            throw error;
        } else {
            const consult_proveedores = [];
            // extracting the name in only 1 field
            results[0].forEach(proveedor => {
                const nombre = proveedor.primer_nombre + ' ' + proveedor.segundo_nombre + ' ' + proveedor.apellido_paterno + ' ' + proveedor.apellido_materno
                const new_proveedor = { 'codigo': proveedor.codigo, 'name': nombre, 'telefono': proveedor.telefono, "empresa": proveedor.empresa, "descripcion": proveedor.descripcion, "requerimientos": proveedor.requerimientos};
                consult_proveedores.push(new_proveedor);
            });
            res.send(consult_proveedores);
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
    const empresa = req.body.empresa;
    const descripcion = req.body.descripcion;

    conection.query('INSERT INTO proveedor SET ?', { primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, empresa, descripcion }, (error, results) => {
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
    const empresa = req.body.empresa;
    const descripcion = req.body.descripcion;
    const v_query = "UPDATE proveedor SET ? where codigo='" + codigo + "';";
    conection.query(v_query, { primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, telefono, empresa, descripcion }, (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('proveedor updated');
        }
    });
};

exports.eliminate = (req, res) => {
    res.setHeader('Content-type', 'text/plain');
    const codigo = req.params.codigo;
    // console.log(codigo);
    conection.query("DELETE FROM proveedor where codigo=?;", (codigo), (error, results) => {
        if (error) {
            throw error;
        }
        else {
            res.send('borrado');
        }
    });
};

