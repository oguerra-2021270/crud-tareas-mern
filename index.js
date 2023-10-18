'use strict';

const mongoose = require('mongoose/index');
const port = 3800;
const app = require('./app');

mongoose.connect('mongodb://127.0.0.1:27017/DbTareas')
    .then(() => {
        console.log('Conexión correcta a la base de datos.');
        app.listen(port, () => {
            console.log('Servidor de express corriendo en el puerto:', port);
        });
    }).catch(err => {
        console.log('Error de conexión.', err);
    });
