const mariadb = require('mysql2');

const connection = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aa987123654',
    database: 'node_api'
});

connection.connect((error) => {
    if(error){
        console.error('Error al conectar con la base de datos',error);
    }else{
        console.log('Conexion exitosa a la bd');
    }
});

module.exports = connection;