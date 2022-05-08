import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private taskSevices: TaskService) { }

  ngOnInit(): void {
    
    
  }

  CerrarPantalla() {
    //this.ActulizarTiempoTask(1,4);
    window.close();
  }

  ActulizarTiempoTask(id: any,tiempo:any) {
      this.taskSevices.ActulizarTiempoTask(id,tiempo)
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        )
    
  }

}
