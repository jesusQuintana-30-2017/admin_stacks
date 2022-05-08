import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Taskestatus } from '../models/taskestatus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskesatusService {

  API_URI = 'http://localhost:3000/api';
  constructor(private http:HttpClient) {}
    getTasksEstatus() {
      return this.http.get(`${this.API_URI}/TaskEstatus`);
    }
    getTasksEstatusFiltro(){
      return this.http.get(`${this.API_URI}/TaskEstatus/Filtro`);
    }
}
