import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  API_URI = 'https://adminstackackend.herokuapp.com/api';
  constructor(private http:HttpClient) {}
    getTasks(estatus:string) {
      return this.http.get(`${this.API_URI}/Task/filtros/${estatus}`);
    }
  
    getTask(id: string) {
      return this.http.get(`${this.API_URI}/Task/${id}`);
    }
  
    deleteTask(id: string) {
      return this.http.delete(`${this.API_URI}/Task/${id}`);
    }

    startTask(id: string|number, startTask: Task){
      return this.http.put(`${this.API_URI}/Task/start/${id}`, startTask);
    }
  
    saveTask(Task: Task) {
      return this.http.post(`${this.API_URI}/Task`, Task);
    }
  
    updateTask(id: string|number, updatedTask: Task): Observable<Task> {
      return this.http.put(`${this.API_URI}/Task/${id}`, updatedTask);
    }
    
    ActulizarTiempoTask(id: string|number,updatedTask: Task): Observable<Task>{
      return this.http.put(`${this.API_URI}/Task/time/${id}`, updatedTask);
    }

    DetenerTask(id: string|number,updatedTask: Task): Observable<Task>{
      return this.http.put(`${this.API_URI}/Task/stop/${id}`, updatedTask);
    }

    ActulizarTiempoCerrarTask(updatedTask: Task): Observable<Task>{
      return this.http.put(`${this.API_URI}/Task/timecerrar/0`, updatedTask);
    }
}
