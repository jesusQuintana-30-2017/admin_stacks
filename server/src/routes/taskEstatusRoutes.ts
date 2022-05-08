import  { Router } from 'express';
import  {taskEstatusController}  from '../controllers/taskEstatusController';


class taskEstatusRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/filtro', taskEstatusController.getFiltros);
        this.router.get('/', taskEstatusController.list);
    }

}

const taskEsatusRoutes = new taskEstatusRoutes();
export default taskEsatusRoutes.router;
