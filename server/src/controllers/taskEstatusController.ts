import { Request, Response } from 'express';


import pool from '../database';

class TaskEsatusController {

    public async list(req: Request, res: Response): Promise<void> {
        const task = await pool.query('SELECT * FROM statustask');
        res.json(task);
    }

    public async getFiltros(req: Request, res: Response): Promise<void> {
        const task = await pool.query('select "0" id, "todos" description union SELECT id, description FROM dbtask.statustask where id <> "E";');
        res.json(task);
    }
}

export const taskEstatusController = new TaskEsatusController;