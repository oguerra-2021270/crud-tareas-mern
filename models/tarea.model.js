'use strict'

const mongoose = require('mongoose/index');

const Schema = mongoose.Schema;
const tareaSchema = Schema({
    nombre: String,
    descripcion: String,
    fecha: Date,
    prioridad: Number
});

module.exports = mongoose.model('tarea', tareaSchema);