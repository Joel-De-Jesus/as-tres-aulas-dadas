
module.exports = (app, connection) => {

    app.get('/', function (request, response) {
        response.send('tudo ok!');
    });

    //INSERT
    app.post('/adicionar-cliente', (req, res) => {

        const user = req.body;
        let sql = `INSERT INTO clientes (nome, sexo_id, endereco, estado_id) VALUES ('${user.nome}', '${user.sexo_id}', '${user.endereco}', '${user.estado_id}')`;

        connection.query(sql, (error, results) => {

            if (error) throw error;

            const {insertId} = results;

            connection.query('SELECT * FROM clientes WHERE id = ? LIMIT 1', [insertId], (error, results) => {

                if (error) throw error;

                res.send(results[0]);
            });
        });
    });

    //FIND ALL
    app.get('/selecionar-cliente', (req, res) => {

        connection.query('SELECT * FROM clientes', (error, results) => {

            if (error) throw error;

            res.send({
                code: 200,
                data: results,
                total: results.length
            });
        });
    });

    //FIND BY ID
    app.get('/selecionar-cliente/:id', (req, res) => {

        const {id} = req.params;

        connection.query(`SELECT * FROM clientes WHERE id = ${id}`, (error, results) => {

            if (error) throw error;

            res.send({
                code: 200,
                data: results[0],
                total: results.length
            });
        });
    });

    //UPDATE
    app.put('/actualizar-cliente/:id', (req, res) => {

        const user = req.body;
        const {id} = req.params;

        connection.query('UPDATE clientes SET ? WHERE id = ?', [user, id], (error, results) => {

            if (error) throw error;

            connection.query('SELECT * FROM clientes WHERE id = ? LIMIT 1', [id], (error, results) => {

                if (error) throw error;

                res.send(results[0]);
            });
        });
    });

    //DELETE
    app.delete('/remover-cliente/:id', (req, res) => {

        const {id} = req.params;

        connection.query('SELECT * FROM clientes WHERE id = ?', [id], (error, results) => {

            if (error) throw error;

            const user = results;

            connection.query('DELETE FROM clientes WHERE id = ?', [id], (error, results) => {

                if (error) throw error;

                res.send(user);
            });
        });
    });
};