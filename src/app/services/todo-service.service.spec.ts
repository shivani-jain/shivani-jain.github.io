import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { TodoTask } from '../models/todo-task';

describe('TodoServiceService - ', () => {
  let service: TodoService;
  let httpClientServiceSpy: jasmine.SpyObj<HttpClient>;
  const mockTaskList: TodoTask[] = [{ "taskName": "taskName 2", "completed": true, "id": "2" }, { "taskName": "taskName 3", "completed": true, "id": "3" }, { "taskName": "taskName 4-1", "completed": false, "id": "4", "isEditing": true }, { "taskName": "taskName 5", "completed": false, "id": "5" }];

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'put', 'delete', 'post']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(TodoService);
    httpClientServiceSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchList - ', () => {
    it ('should call the get API and return the task list', () => {
      httpClientServiceSpy.get.and.returnValue(of(mockTaskList));

      service.fetchList().subscribe((data: any) => {
        expect(data).toEqual(mockTaskList);
        expect(httpClientServiceSpy.get).toHaveBeenCalledWith('https://63bd95b3bc99130c6cf7513a.mockapi.io/task');
      });
    });

    it ('should call the get API and throw error when server throws error', () => {
      const mockErrorResponse = {
        data: null,
        message: null,
        status: false
      };
      const errorResponse = new HttpErrorResponse({error: mockErrorResponse});
      httpClientServiceSpy.get.and.returnValue(throwError(errorResponse));

      service.fetchList().subscribe(() => {}, (error: HttpErrorResponse) => {
        expect(error.error).toEqual(mockErrorResponse);
        expect(httpClientServiceSpy.get).toHaveBeenCalledWith('https://63bd95b3bc99130c6cf7513a.mockapi.io/task');
      });
    });
  });

  describe('saveTask - ', () => {
    it ('should call the post API and return the task list', () => {
      httpClientServiceSpy.post.and.returnValue(of(mockTaskList[0]));

      service.saveTask(mockTaskList[0]).subscribe((data: any) => {
        expect(data).toEqual(mockTaskList[0]);
        expect(httpClientServiceSpy.post).toHaveBeenCalledWith('https://63bd95b3bc99130c6cf7513a.mockapi.io/task', mockTaskList[0]);
      });
    });

    it ('should call the get API and throw error when server throws error', () => {
      const mockErrorResponse = {
        data: null,
        message: null,
        status: false
      };
      const errorResponse = new HttpErrorResponse({error: mockErrorResponse});
      httpClientServiceSpy.post.and.returnValue(throwError(errorResponse));

      service.saveTask(mockTaskList[0]).subscribe(() => {}, (error: HttpErrorResponse) => {
        expect(error.error).toEqual(mockErrorResponse);
        expect(httpClientServiceSpy.post).toHaveBeenCalledWith('https://63bd95b3bc99130c6cf7513a.mockapi.io/task', mockTaskList[0]);
      });
    });
  });
});