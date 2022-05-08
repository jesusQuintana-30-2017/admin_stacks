import { Request, Response } from 'express';


import pool from '../database';

class TaskController {

    public async list(req: Request, res: Response): Promise<void> {
        var { estatus } = req.params;
        if(estatus=="0")
        {
            estatus="";
        }
        const task = await pool.query('SELECT t.id,t.description,date_format(start_date,"%d/%m/%Y %H:%i:%s")start_date,date_format(final_date,"%d/%m/%Y %H:%i:%s")final_date,'+
        'TIMESTAMPDIFF(minute,start_date, final_date )duration,te.description estatus,'+
        'ifnull(time_current,0) time_current FROM task t '+
        'inner join statustask te on t.estatus= te.id WHERE estatus like concat("%",?,"%") order by te.order asc ', [estatus]);

            res.json(task);
        
        
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const task = await pool.query('SELECT * FROM task WHERE id = ?', [id]);
        console.log(task.length);
        if (task.length > 0) {
            return res.json(task[0]);
        }
        res.status(404).json({ text: "La tarea no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO task (id,description,start_date,final_date,estatus) values (?, ?, '+
        'DATE_FORMAT(STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.000Z"),"%Y-%m-%d %H:%i:%s"),  '+
        'DATE_FORMAT(STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.000Z"),"%Y-%m-%d %H:%i:%s"),?)', [req.body.id,req.body.description,req.body.start_date,req.body.final_date,req.body.estatus]);
        res.json({ message: 'Tarea iniciada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE task set description = ?, '+
        'start_date = DATE_FORMAT(STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.000Z"),"%Y-%m-%d %H:%i:%s"),  '+
        'final_date = DATE_FORMAT(STR_TO_DATE(?,"%Y-%m-%dT%H:%i:%s.000Z"),"%Y-%m-%d %H:%i:%s"),  '+
        'estatus = ?,time_total=(time_total+time_current) WHERE id = ? ', [req.body.description,req.body.start_date,req.body.final_date,req.body.estatus, id,req.body.time_total]);
        res.json({ message: "La tarea fue actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE task set estatus = "E" WHERE id = ?', [id]);
        res.json({ message: "Tarea eliminada" });
    }

    public async start(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE task set time_current = "0" WHERE id = ? AND estatus = "P" ', [id]);
        res.json({ message: "Tarea iniciada" });
    }
    
    public async actulizarTiempo(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE task set time_current = ? WHERE id = ? AND estatus = "P" ', [req.body.current_time,id]);
        res.json({ message: "Tarea iniciada" });
    }

    public async Detene_tarea(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE task set time_current = ?,estatus = "C" WHERE id = ? AND estatus = "P" ', [req.body.current_time,id]);
        res.json({ message: "Tarea iniciada" });
    }
    
    public async ActulizarCerrar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('UPDATE task set time_current = ? WHERE  estatus = "P" ', [req.body.current_time]);
        res.json({ message: "Tarea iniciada" });
    }
}

export const taskController = new TaskController;