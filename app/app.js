const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const session = require("express-session")
const mysqlstore = require('express-mysql-session')
const options = {
   host: process.env.HOST,
   // port: process.env.PORT,
   user: process.env.USER,
   password: process.env.PASSWORD,
   database: process.env.DATABASE,
};
const session_store = new mysqlstore(options);

app.use('/imgs', express.static('imgs'));
app.use('/imgs', express.static(__dirname + 'imgs'));

app.use(session({
   key: 'cookie_usuario',
   secret: 'secret',
   store: session_store,
   resave: false,
   saveUninitialized: false
}));


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/', require('./router'));

app.listen(PORT, () => {
   console.log("Server corriendo en http://localhost:" + PORT);
});