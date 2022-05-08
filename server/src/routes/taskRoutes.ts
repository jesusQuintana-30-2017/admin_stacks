import { Router } from 'express';

import  {taskController}  from '../controllers/taskController';

class TaskRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/filtros/:estatus', taskController.list);
        this.router.get('/:id', taskController.getOne);
        this.router.post('/', taskController.create);
        this.router.put('/:id', taskController.update);
        this.router.delete('/:id', taskController.delete);
        this.router.put('/start/:id', taskController.start);
        this.router.put('/time/:id', taskController.actulizarTiempo);
        this.router.put('/stop/:id', taskController.Detene_tarea);
        this.router.put('/timecerrar/:id', taskController.ActulizarCerrar);
    }

}

const taskRoutes = new TaskRoutes();
export default taskRoutes.router;