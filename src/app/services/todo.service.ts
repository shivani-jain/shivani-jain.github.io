import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { TodoTask } from '../models/todo-task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private httpClient: HttpClient) { }

  fetchList(): Observable<TodoTask[]>  {
    return this.httpClient.get('https://63bd95b3bc99130c6cf7513a.mockapi.io/task')
      .pipe(map((data: any) => {
        return data as TodoTask[];
      }), catchError((error: HttpErrorResponse) => {
        return of([] as TodoTask[])
      }));
  }

  saveTask(task: TodoTask): Observable<TodoTask> {
    return this.httpClient.post('https://63bd95b3bc99130c6cf7513a.mockapi.io/task', task)
      .pipe(map((data: any) => {
        return data as TodoTask;
      }), catchError((error: HttpErrorResponse) => {
        return of({} as TodoTask)
      }));
  }

  updateTask(task: TodoTask): Observable<TodoTask> {
    return this.httpClient.put(`https://63bd95b3bc99130c6cf7513a.mockapi.io/task/${task.id}`, task)
      .pipe(map((data: any) => {
        return data as TodoTask;
      }), catchError((error: HttpErrorResponse) => {
        return of({} as TodoTask)
      }));
  }

  deleteTask(taskId: string): Observable<TodoTask> {
    return this.httpClient.delete(`https://63bd95b3bc99130c6cf7513a.mockapi.io/task/${taskId}`)
      .pipe(map((data: any) => {
        return data as TodoTask;
      }), catchError((error: HttpErrorResponse) => {
        return of({} as TodoTask)
      }));
  }
}
