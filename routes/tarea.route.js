'use strict'

const express = require('express');
const tareaController = require('../controllers/tarea.controller');

const tareaRouter = express.Router();

tareaRouter.post('/crear', tareaController.createTarea);

tareaRouter.get('/leer', tareaController.getTareas);

tareaRouter.get('/leer/:id', tareaController.getTarea);

tareaRouter.put('/actualizar/:id', tareaController.updateTarea);

tareaRouter.delete('/eliminar/:id', tareaController.deleteTarea);

module.exports = tareaRouter;