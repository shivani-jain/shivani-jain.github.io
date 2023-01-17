import { FormControl, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { TodoTask } from 'src/app/models/todo-task';

/**
 * Component for the Add Task dialog
 */
@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent {

  constructor(private todoService: TodoService,
              private dialogRef: MatDialogRef<AddTaskDialogComponent>) { }

  public taskName = new FormControl('', [Validators.required]);

  addTask(): void {
    let task: TodoTask = {
      taskName: this.taskName.value || '',
      id: Math.floor(Math.random() * 100) + '',
      completed: false
    }
    
    this.todoService.saveTask(task).subscribe((data: TodoTask) => {
      this.dialogRef.close(data);
    });
  }
}
