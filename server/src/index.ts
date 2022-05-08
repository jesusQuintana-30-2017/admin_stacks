// se utilizo la librera express para el servicio del front
import express, {Application, application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
// las rutas para el llamado al back en
import indexRoutes from './routes/indexRoutes';
import taskRoutes from './routes/taskRoutes';
import taskEsatusRoutes from './routes/taskEstatusRoutes';

class Server{
    public app:Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config():void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
// rutas para el back end
    routes():void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/task',taskRoutes);
        this.app.use('/api/TaskEstatus',taskEsatusRoutes);

    }

    start():void{
        this.app.listen(this.app.get('port'), () => {
            console.log('server in port',this.app.get('port'))
        });
    }
}

const server =new Server();
server.start();