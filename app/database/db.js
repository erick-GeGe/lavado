const mysql = require('mysql');

const conection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

conection.connect((error)=>{
    if(error){
        console.log("Conection Error: " + error);
        return;
    }
    console.log("Conected to Database !!!");
});

module.exports = conection;