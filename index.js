const users = require('./routers/users');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require( 'mysql2' );

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// cria a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'emprestimo'
});

connection.connect((error) => {
   if (error) {
       throw error
   }

   users(app, connection);
});

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:' + PORT)
});