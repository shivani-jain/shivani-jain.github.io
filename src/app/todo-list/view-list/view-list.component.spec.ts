import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { AddTaskDialogComponent } from '../add-task/add-task-dialog.component';
import { AddTaskDialogService } from './../add-task/add-task-dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './../../pipe/filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from 'src/app/services/todo.service';
import { TodoTask } from 'src/app/models/todo-task';
import { ViewListComponent } from './view-list.component';
import { of } from 'rxjs';

describe('ViewListComponent', () => {
  let component: ViewListComponent;
  let fixture: ComponentFixture<ViewListComponent>;
  let toDoServiceSpy: jasmine.SpyObj<TodoService>;
  let addTaskDialogService: AddTaskDialogService;
  const mockTaskList: TodoTask[] = [{ "taskName": "taskName 2", "completed": true, "id": "2" }, { "taskName": "taskName 3", "completed": true, "id": "3" }, { "taskName": "taskName 4-1", "completed": false, "id": "4", "isEditing": true }, { "taskName": "taskName 5", "completed": false, "id": "5" }];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['saveTask', 'updateTask', 'deleteTask']);
    await TestBed.configureTestingModule({
      declarations: [ViewListComponent, FilterPipe],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ taskList: mockTaskList })
          }
        },
        { provide: TodoService, useValue: spy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewListComponent);
    component = fixture.componentInstance;
    component.taskList = mockTaskList;
    toDoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    addTaskDialogService = TestBed.inject(AddTaskDialogService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit - ', () => {
    it('should make isEditing false for all task', () => {
      component.ngOnInit();

      expect(component.taskList[0].isEditing).toBe(false);
      expect(component.taskList[1].isEditing).toBe(false);
      expect(component.taskList[2].isEditing).toBe(false);
    });
  });

  describe('addTask - ', () => {
    it('should call service toDoService.saveTask', () => {
      spyOn(addTaskDialogService, 'show').and.returnValue({
        afterClosed: () => of({})
      } as MatDialogRef<AddTaskDialogComponent>
      )

      component.addTask();

      expect(addTaskDialogService.show).toHaveBeenCalledTimes(1);
    });
  });

  describe('editTask - ', () => {
    it('make isEditing true', () => {
      component.editTask(mockTaskList[0]);
      expect(mockTaskList[0].isEditing).toEqual(true);
    });
  });

  describe('getListClass - ', () => {
    it('should return the class name with prefix color and number between 1-5', () => {
      expect(component.getListClass(5)).toEqual('color-2');
      expect(component.getListClass(4)).toEqual('color-1');
    });
  });


  describe('markAsCompleted - ', () => {
    it('should call service toDoService.updateTask', () => {
      const mockTask = { "taskName": "taskName 4", "completed": false, "id": "21" };
      toDoServiceSpy.updateTask.and.returnValue(of(mockTask));
      spyOn(component, 'updateTaskList');

      component.markAsCompleted(mockTask);

      expect(mockTask.completed).toEqual(true);
      expect(toDoServiceSpy.updateTask).toHaveBeenCalledTimes(1);
      expect(component.updateTaskList).toHaveBeenCalledWith(mockTask, false);
    });
  });

  describe('updateTaskList - ', () => {
    it('should update the task when isDelete is false', () => {
      const updatedMockTask = { "taskName": "taskName - 2", "completed": true, "id": "2" };

      component.updateTaskList(updatedMockTask, false);

      expect(component.taskList[0].taskName).toEqual('taskName - 2');
    });

    it('should delete the task when isDelete is true', () => {
      const updatedMockTask = { "taskName": "taskName 3", "completed": true, "id": "3" };
      expect(component.taskList.length).toEqual(4);

      component.updateTaskList(updatedMockTask, true);

      expect(component.taskList.length).toEqual(3);
    });
  });

  describe('deleteTask - ', () => {
    it('should call service toDoService.deleteTask', () => {
      const mockTask = {"taskName":"taskName 2","completed":false,"id":"2"};

      toDoServiceSpy.deleteTask.and.returnValue(of(mockTask));
      spyOn(component, 'updateTaskList');

      component.deleteTask('2');


      expect(toDoServiceSpy.deleteTask).toHaveBeenCalledTimes(1);
      expect(component.updateTaskList).toHaveBeenCalledWith(mockTask, true);
    });
  });
});
