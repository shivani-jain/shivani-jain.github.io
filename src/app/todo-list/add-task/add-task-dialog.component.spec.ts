import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AddTaskDialogComponent } from './add-task-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
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
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatDividerModule,
        ReactiveFormsModule
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
