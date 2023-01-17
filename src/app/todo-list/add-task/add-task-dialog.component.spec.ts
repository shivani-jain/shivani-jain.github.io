import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskDialogComponent } from './add-task-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todo.service';
import { of } from 'rxjs';

describe('AddTaskDialogComponent - ', () => {
  let component: AddTaskDialogComponent;
  let fixture: ComponentFixture<AddTaskDialogComponent>;
  let toDoServiceSpy: jasmine.SpyObj<TodoService>;
  const dialogMock = {
    close: (callBackConfig: any) => {}
  }

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['saveTask']);
    await TestBed.configureTestingModule({
      declarations: [ AddTaskDialogComponent ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TodoService, useValue: spy },
        {provide: MatDialogRef, useValue: dialogMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskDialogComponent);
    toDoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addTask - ', () => {
    it('should call service todoService.saveTask', () => {
      const mockTask = { "taskName": "taskName 4", "completed": false, "id": "21" };
      toDoServiceSpy.saveTask.and.returnValue(of(mockTask));
      component.taskName.setValue('taskName 4');
      spyOn(dialogMock, 'close');

      component.addTask();

      expect(toDoServiceSpy.saveTask).toHaveBeenCalledTimes(1);
      expect(dialogMock.close).toHaveBeenCalled();
    });
  });
});
