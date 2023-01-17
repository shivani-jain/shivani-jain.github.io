import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { TodoTask } from '../models/todo-task';

/**
 * This resolver is used when view-list componenet is loaded to load the task list
 */
@Injectable({
  providedIn: 'root'
})
export class FetchTaskResolver implements Resolve<TodoTask[]> {
  constructor(private todoService: TodoService) {}

  /**
   * Resolve function to call todoService.fetchList
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TodoTask[]> {
    return this.todoService.fetchList();
  }
}