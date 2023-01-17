import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';

import { TodoService } from 'src/app/services/todo.service';
import { TodoTask } from 'src/app/models/todo-task';

/**
 * This component is used for editing a task
 */
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditTaskComponent {
  @Input() task: TodoTask = {
    taskName: '',
    id: '-1'
  }

  editTaskName = new FormControl('', [Validators.required]);

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.editTaskName.setValue(this.task.taskName);
  }

  editTask(): void {
    this.task.taskName = this.editTaskName.value || '';
    this.todoService.updateTask(this.task).subscribe((data: TodoTask) => {
      this.task.taskName = data.taskName;
      this.task.isEditing = false;
    });
  }

  cancelTask(): void {
    this.task.isEditing = false;
  }
}
