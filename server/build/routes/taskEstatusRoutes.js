"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskEstatusController_1 = require("../controllers/taskEstatusController");
class taskEstatusRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/filtro', taskEstatusController_1.taskEstatusController.getFiltros);
        this.router.get('/', taskEstatusController_1.taskEstatusController.list);
    }
}
const taskEsatusRoutes = new taskEstatusRoutes();
exports.default = taskEsatusRoutes.router;
