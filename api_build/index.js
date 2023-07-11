const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db_connection = require('./db_connection');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = db_connection.connection;

app.get('/api/usuarios/list', (req, res) => {
    const query = "SELECT * FROM usuarios";

    db_connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: `Error al obtener los usuarios -> ${error.message}` });
        } else {
            res.json(results);
        }
    });

});

app.get('/api/usuarios/get/:id', (req, res) => {
    let userId = req.params.id;

    let query = `select * from usuarios where id = ${userId}`;

    db_connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: `Error al obtener usuario por id -> ${error.message}` })
        } else {
            res.json(results);
        }
    });

});

app.post('/api/usuarios/insert', (req, res) => {
    let { cedula, nombre, celular } = req.body;

    let query = `insert into usuarios (cedula, nombre, celular) values ('${cedula}', '${nombre}', '${celular}');`

    db_connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: `Error al insertar usuario -> ${error.message}` });
        } else {
            res.json("Usuario insertado correctamente");
        }
    });


});


app.put('/api/usuarios/update/:id', (req, res) => {
    let { cedula, nombre, celular } = req.body;

    let query =
        `update usuarios 
    set cedula = '${cedula}', nombre = '${nombre}', celular = '${celular}'
    where id = ${req.params.id}`;

    db_connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: `Error al actualizar usuario -> ${error.message}` });
        } else {
            res.json(`Usuario ${nombre} actualizado correctamente`);
        }
    });

});

app.delete('/api/usuarios/delete/:id', (req, res) => {
    
    let query = `delete from usuarios where id = ${req.params.id}`;
   
    db_connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: `Error al eliminar usuario -> ${error.message}`});
        } else {
            res.json(`Usuario ${req.params.id} eliminado correctamente`);
        }
    });

});


const puerto = 3000;

app.listen(puerto, () => {
    console.log(`Servicio escuchando en el puerto: ${puerto}`);
});


