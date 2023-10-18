'use strict'

const Tarea = require('../models/tarea.model');
const moment = require('moment');

const createTarea = async (req, res) => {
    const body = req.body;
    const tarea = new Tarea();
    if (body.nombre && body.descripcion && body.fecha && body.prioridad) {
        tarea.nombre = body.nombre;
        tarea.descripcion = body.descripcion;
        tarea.fecha = body.fecha;
        tarea.prioridad = body.prioridad;

        try {
            const savedTarea = await tarea.save();
            res.send({
                success: true,
                message: "Se guardó correctamente",
                data: tarea
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                error
            })
        }
    } else {
        res.status(400).send({
            success: false,
            error: "Parametros inválidos"
        })
    }
};

const getTarea = async (req, res) => {
    const params = req.params;

    if (params.id) {
        try {
            const tarea = await Tarea.findById(params.id);
            const fechaCasteada = new Date(tarea.fecha);
            res.send({
                success: true,
                message: "Tarea encontrada",
                data: {
                    nombre: tarea.nombre,
                    descripcion: tarea.descripcion,
                    fecha: moment(fecha).format('DD-MM-YYYY'),
                    prioridad: tarea.prioridad
                }
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                error: error.message
            });
        }
    } else {
        res.status(400).send({
            success: false,
            error: "Datos incorrectos"
        });
    }
}

const getTareas = async (req, res) => {

    try {
        const tareas = await Tarea.find();

        res.send({
            success: true,
            message: "Tareas encontradas",
            data: tareas.map((tarea) => {
                const fechaCasteada = new Date(tarea.fecha);
                return ({
                    id: tarea._id,
                    nombre: tarea.nombre,
                    descripcion: tarea.descripcion,
                    fecha: moment(fechaCasteada).format('YYYY-MM-DD'),
                    prioridad: tarea.prioridad
                })
            })
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error.message
        });
    }
}


const updateTarea = async (req, res) => {
    const params = req.params;
    const body = req.body;
    if (body.nombre || body.descripcion || body.fecha || body.prioridad) {

        try {
            const updatedTarea = await Tarea.findByIdAndUpdate(params.id, body, { new: true });
            res.send({
                success: true,
                message: "Se guardó correctamente",
                data: updatedTarea
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                error: error.message
            })
        }
    } else {
        res.status(400).send({
            success: false,
            error: "Parametros inválidos"
        })
    }
};

const deleteTarea = async (req, res) => {
    const params = req.params;

    if (params.id) {
        try {
            const tarea = await Tarea.findByIdAndDelete(params.id);
            res.send({
                success: true,
                message: "Tarea eliminada",
                data: tarea
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                error: error.message
            });
        }
    } else {
        res.status(400).send({
            success: false,
            error: "Datos incorrectos"
        });
    }
}

module.exports = {
    createTarea,
    getTarea,
    getTareas,
    updateTarea,
    deleteTarea
}