"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
class TaskRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/filtros/:estatus', taskController_1.taskController.list);
        this.router.get('/:id', taskController_1.taskController.getOne);
        this.router.post('/', taskController_1.taskController.create);
        this.router.put('/:id', taskController_1.taskController.update);
        this.router.delete('/:id', taskController_1.taskController.delete);
        this.router.put('/start/:id', taskController_1.taskController.start);
        this.router.put('/time/:id', taskController_1.taskController.actulizarTiempo);
        this.router.put('/stop/:id', taskController_1.taskController.Detene_tarea);
        this.router.put('/timecerrar/:id', taskController_1.taskController.ActulizarCerrar);
    }
}
const taskRoutes = new TaskRoutes();
exports.default = taskRoutes.router;
