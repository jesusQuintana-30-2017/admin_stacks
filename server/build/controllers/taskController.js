"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const database_1 = __importDefault(require("../database"));
class TaskController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var { estatus } = req.params;
            if (estatus == "0") {
                estatus = "";
            }
            const task = yield database_1.default.query('SELECT t.id,t.description,date_format(start_date,"%d/%m/%Y %H:%i:%s")start_date,date_format(final_date,"%d/%m/%Y %H:%i:%s")final_date,' +
                'TIMESTAMPDIFF(minute,start_date, final_date )duration,te.description estatus,' +
                'ifnull(time_current,0) time_current FROM task t ' +
                'inner join statustask te on t.estatus= te.id WHERE estatus like concat("%",?,"%") order by te.order asc ', [estatus]);
            res.json(task);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const task = yield database_1.default.query('SELECT * FROM task WHERE id = ?', [id]);
            console.log(task.length);
            if (task.length > 0) {
                return res.json(task[0]);
            }
            res.status(404).json({ text: "La tarea no existe" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO task (id,description,start_date,final_date,estatus) values (?, ?, ' +
                'DATE_FORMAT(STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.000Z"),"%Y-%m-%d %H:%i:%s"),  ' +
                'DATE_FORMAT(STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.000Z"),"%Y-%m-%d %H:%i:%s"),?)', [req.body.id, req.body.description, req.body.start_date, req.body.final_date, req.body.estatus]);
            res.json({ message: 'Tarea iniciada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE task set description = ?, ' +
                'start_date = DATE_FORMAT(STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.000Z"),"%Y-%m-%d %H:%i:%s"),  ' +
                'final_date = DATE_FORMAT(STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.000Z"),"%Y-%m-%d %H:%i:%s"),  ' +
                'estatus = ?,time_total=(time_total+time_current) WHERE id = ? ', [req.body.description, req.body.start_date, req.body.final_date, req.body.estatus, id, req.body.time_total]);
            res.json({ message: "La tarea fue actualizada" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE task set estatus = "E" WHERE id = ?', [id]);
            res.json({ message: "Tarea eliminada" });
        });
    }
    start(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE task set time_current = "0" WHERE id = ? AND estatus = "P" ', [id]);
            res.json({ message: "Tarea iniciada" });
        });
    }
    actulizarTiempo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE task set time_current = ? WHERE id = ? AND estatus = "P" ', [req.body.current_time, id]);
            res.json({ message: "Tarea iniciada" });
        });
    }
    Detene_tarea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE task set time_current = ?,estatus = "C" WHERE id = ? AND estatus = "P" ', [req.body.current_time, id]);
            res.json({ message: "Tarea iniciada" });
        });
    }
    ActulizarCerrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE task set time_current = ? WHERE  estatus = "P" ', [req.body.current_time]);
            res.json({ message: "Tarea iniciada" });
        });
    }
}
exports.taskController = new TaskController;
