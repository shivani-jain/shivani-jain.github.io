import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AddTaskDialogService } from '../add-task/add-task-dialog.service';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TodoService } from 'src/app/services/todo.service';
import { TodoTask } from 'src/app/models/todo-task';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

/**
 * This component displays the todo list and also let user perform action over it
 */
@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ViewListComponent implements OnInit {

  constructor(private todoService: TodoService,
    private activatedRoute: ActivatedRoute,
    private addTaskDialogService: AddTaskDialogService) { }

  /**
   * The task list from the DB
   */
  public taskList: TodoTask[] = [];

  /**
   * Form Control for the search task field
   */
  searchText: FormControl = new FormControl('');

  /**
   * Filter arguments for seraching the task
   */
  filterargs: { taskName: string } = { taskName: '' };

  /**
   * Initialization function
   * 1. Gets data from the resolver and assign to taskList
   * 2. Captures the change event of the search text
   */
  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.taskList = data.taskList;
      for (const task of this.taskList) {
        task.isEditing = false;
      }
    });

    this.searchText.valueChanges.subscribe((val: string) => {
      this.filterargs = { taskName: val };
    });
  }

  /**
   * Opens the Dialog for adding task and then updating the list after dialog is closed
   */
  addTask(): void {
    this.addTaskDialogService.show().afterClosed().subscribe((newTask: TodoTask) => {
      if (newTask) {
        this.taskList.unshift(newTask)
      }
    });
  }

  /**
   * Makes the API call to update the task and mark it as complete
   */
  markAsCompleted(task: TodoTask) {
    task.completed = true;
    this.todoService.updateTask(task).subscribe((data: TodoTask) => {
      this.updateTaskList(data, false);
    }, catchError((error: HttpErrorResponse) => {
      return of(error);
    }));
  }

  /**
   * Updates the respective task in the taskList. If isDelete is true,
   * it removes the task from taskList
   */
  updateTaskList(updatedTask: TodoTask, isDelete: boolean) {
    for (let i = 0; i < this.taskList.length; i++) {
      if (this.taskList[i].id === updatedTask.id) {
        if (isDelete) {
          this.taskList.splice(i, 1);
        } else {
          this.taskList[i] = updatedTask;
        }
      }
    }
  }

  /**
   * Makes API call to remove a task
   */
  deleteTask(taskId: string) {
    this.todoService.deleteTask(taskId).subscribe((data: TodoTask) => {
      this.updateTaskList(data, true);
    }, catchError((error: HttpErrorResponse) => {
      return of(error);
    }));
  }

  /**
   * Marks the isEditing key to true for a task
   */
  editTask(task: TodoTask): void {
    task.isEditing = true;
  }

  /**
   * Return the respective class string for the list
   */
  getListClass(i: number): string {
    let index = ((i + 1) % 5) + 1
    return 'color-' + index;
  }
}


