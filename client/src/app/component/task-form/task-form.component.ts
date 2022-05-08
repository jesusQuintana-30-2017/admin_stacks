import { Component, OnInit,HostBinding } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Taskestatus } from 'src/app/models/taskestatus';
import { TaskService} from '../../services/task.service';
import { TaskesatusService} from '../../services/taskesatus.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['../../../styles.css']
})
export class TaskFormComponent implements OnInit {
  @HostBinding('class') clases = 'row';

  task: Task = {
    id: 0,
    description: '',
    start_date: new Date,
    final_date: new Date,
    duration:0,
    current_time:0,
    estatus:"",
    time_total:0
  };

  taskestatus: any = {
    id: '',
    description: ''
  };

  edit: boolean = false;
  constructor(private TasksSevice : TaskService,private TaskesatusService: TaskesatusService,  private router: Router, private activatedRoute: ActivatedRoute)   { }

   ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params['id']);
    if (params) {
      this.TasksSevice.getTask(params['id']).subscribe(
          res => {
            console.log(res);
            this.task = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
    this.TaskesatusService.getTasksEstatus()
    .subscribe(
      res => {
        console.log(res);
        this.taskestatus = res;
      },
      err => console.log(err)
    )
    
  }

 

  saveNewTask() {
    delete this.task.id;
    this.TasksSevice.saveTask(this.task)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/task']);
        },
        err => console.error(err)
      )
  }

  updateTask() {
    this.TasksSevice.updateTask(this.task.id!, this.task)
      .subscribe(
        res => { 
          console.log(res);
          this.router.navigate(['/task']);
        },
        err => console.error(err)
      )
  }

}
