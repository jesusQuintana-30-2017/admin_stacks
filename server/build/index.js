"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// se utilizo la librera express para el servicio del front
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// las rutas para el llamado al back en
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const taskEstatusRoutes_1 = __importDefault(require("./routes/taskEstatusRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    // rutas para el back end
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/task', taskRoutes_1.default);
        this.app.use('/api/TaskEstatus', taskEstatusRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server in port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
