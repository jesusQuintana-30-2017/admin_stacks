import { Component, OnInit,HostBinding , Directive, EventEmitter, Input, Output, QueryList, ViewChildren, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task';
import { Taskestatus } from 'src/app/models/taskestatus';
import { TaskService } from '../../services/task.service';
import { TaskesatusService} from '../../services/taskesatus.service';
import {MatSort, Sort} from '@angular/material/sort';
import { timer } from 'rxjs';



@Component({
  selector: 'ngbd-table-sortable',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})


export class TaskListComponent implements OnInit,OnDestroy {
  subscription: Subscription;
  everyOneSeconds: Observable<number> = timer(0, 1000);
  toDisplay = true;
  @HostBinding('class') classes = 'row';
  itask: Task = {
    id: 0,
    description: '',
    start_date: new Date,
    final_date: new Date,
    duration:0,
    current_time:0,
    estatus:"",
    time_total:0
  };


  constructor(private taskSevices: TaskService,private TaskesatusService: TaskesatusService) {
    
    this.sortedData = this.task.slice();
    this.subscription = this.everyOneSeconds.subscribe();
   }
  status : any = "0";
  task :any  =[];
  taskestatus: any = [];
  sortedData: any[];
  interval:any;
  butonPlay:any = "";
  seconder:any=0;
  hour:any=0;
  minute:any=0;
  second:any=0;
  play_reiniciar:any="play_arrow";
  

  ngOnInit(): void {
    this.getTaskEstatus();
  }

  getTasks(estatus:string) {
    this.taskSevices.getTasks(estatus)
      .subscribe(
        res => {
          this.task = res;
          this.sortedData = this.task.slice();
        },
        err => console.error(err)
      );
  }

  getTaskEstatus() {
    this.TaskesatusService.getTasksEstatusFiltro()
    .subscribe(
      res => {
        console.log(res);
        this.taskestatus = res;
        this.getTasks(this.taskestatus[0].id)
      },
      err => console.log(err)
    )
  }

  deleteTasks(id: any) {
    var respuesta= confirm("¿Desea borrar la tarea?");
    if(respuesta == true)
    {
      this.taskSevices.deleteTask(id)
        .subscribe(
          res => {
            console.log(res);
            this.getTasks(this.status);
          },
          err => console.error(err)
        )
    }
    
  }
  
  StartTasks(id: any) {
    if(this.butonPlay=="")
    {
      var respuesta= confirm("¿Desea iniciar la tarea?");
      if(respuesta == true)
      {
        this.taskSevices.startTask(id, this.task)
          .subscribe(
            res => {
              this.subscription.unsubscribe();
              this.seconder=0;
              //this.play_reiniciar="refresh";
              this.subscription = this.everyOneSeconds.subscribe(() => {
                this.seconder+=1;
              });
              
            },
            err => console.error(err)
          );
          this.butonPlay="iniciada";
      }
    }
    else
    {
      var respuesta= confirm("¿Desea reiniciar la tarea?");
      if(respuesta == true)
      {
        this.taskSevices.startTask(id, this.task)
          .subscribe(
            res => {
              this.subscription.unsubscribe();
              this.seconder=0;
              //this.play_reiniciar="refresh";
              this.subscription = this.everyOneSeconds.subscribe(() => {
                this.seconder+=1;
              });
              
            },
            err => console.error(err)
          );
          this.butonPlay="";
      }
    }
    
  }
  
  RestartTasks(id: any) {
      var respuesta= confirm("¿Desea reiniciar la tarea?");
      if(respuesta == true)
      {
        this.taskSevices.startTask(id, this.task)
          .subscribe(
            res => {
              this.subscription.unsubscribe();
              this.seconder=0;
              //this.play_reiniciar="refresh";
              this.subscription = this.everyOneSeconds.subscribe(() => {
                this.seconder+=1;
              });
              
            },
            err => console.error(err)
          );
          this.butonPlay="";
      }
  
    
  }

  PausaTasks(id: any) {
    if(this.butonPlay=="iniciada")
    {
      this.itask.current_time+=this.seconder;
      this.itask.id=id;
      this.taskSevices.ActulizarTiempoTask(id,this.itask )
      .subscribe(
        res => {
          this.subscription.unsubscribe();
          this.seconder=0;
          this.butonPlay="";
          this.getTasks(this.status);
        },
        err => console.error(err)
      );
        this.butonPlay="pausado";

    }
    else if(this.butonPlay="pausado")
    {
      this.subscription.unsubscribe();
      this.seconder=0
      this.subscription = this.everyOneSeconds.subscribe(() => {
        this.seconder+=1;
      });
      this.butonPlay="iniciada";
    }
    
  }

  StopTasks(id: any) {
        

        var respuesta= confirm("¿Desea detener la tarea?");
        if(respuesta == true)
        {
          this.itask.current_time+=this.seconder;
          this.itask.id=id;
          this.taskSevices.DetenerTask(id,this.itask )
            .subscribe(
              res => {
                this.subscription.unsubscribe();
                this.seconder=0;
                this.butonPlay="";
                this.getTasks(this.status);
              },
              err => console.error(err)
            );
            this.butonPlay="";
        }

    
    
  }



  
  
  

  sortData(sort: any) {
    const data = this.task.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: { name: string | number; final_date: string | number; duration: string | number; current_time: string | number; estatus: string | number; }, b: { name: string | number; final_date: string | number; duration: string | number; current_time: string | number; estatus: string | number; }) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'fechafin':
          return compare(a.final_date, b.final_date, isAsc);
        case 'duracion':
          return compare(a.duration, b.duration, isAsc);
        case 'tiempo':
          return compare(a.current_time, b.current_time, isAsc);
        case 'estatus':
          return compare(a.estatus, b.estatus, isAsc);
        default:
          return 0;
      }
    });
  }
  ngOnDestroy() {
    this.itask.current_time+=this.seconder;

      this.taskSevices.ActulizarTiempoCerrarTask(this.itask)
      .subscribe(
        res => {
          this.subscription.unsubscribe();
          this.seconder=0;
          this.butonPlay="";
        },
        err => console.error(err))
  }

  contador02(time_curret:any,estatus:any)
  {
    if(estatus=='Pendiente')
    {
      time_curret=time_curret+this.seconder;
      this.hour = Math.floor(time_curret / 3600);
      this.hour = (this.hour < 10)? '0' + this.hour : this.hour;
      this.minute = Math.floor((time_curret / 60) % 60);
      this.minute = (this.minute < 10)? '0' + this.minute : this.minute;
      this.second = time_curret % 60;
      this.second = (this.second < 10)? '0' + this.second : this.second;
      return this.hour + ':' + this.minute + ':' + this.second; 
    }
    else
    {
        return "";
    }
  }

  contador01(time_curret:any)
{

    time_curret=time_curret;
    this.hour = Math.floor(time_curret / 3600);
    this.hour = (this.hour < 10)? '0' + this.hour : this.hour;
    this.minute = Math.floor((time_curret / 60) % 60);
    this.minute = (this.minute < 10)? '0' + this.minute : this.minute;
    this.second = time_curret % 60;
    this.second = (this.second < 10)? '0' + this.second : this.second;
    return this.hour + ':' + this.minute + ':' + this.second; 
  

}
alerta(mensaje:String)
{
  alert(mensaje);
}
}




function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}





