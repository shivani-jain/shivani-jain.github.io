import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { EditTaskComponent } from './edit-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TodoService } from 'src/app/services/todo.service';
import { of } from 'rxjs';

describe('EditTaskComponent - ', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let toDoServiceSpy: jasmine.SpyObj<TodoService>;
  const mockTask = { "taskName": "taskName 2", "completed": true, "id": "2" };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['updateTask']);
    await TestBed.configureTestingModule({
      declarations: [ EditTaskComponent ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: TodoService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskComponent);
    toDoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('editTask - ', () => {
    it('should call API tp update task', () => {
      component.editTaskName.setValue('Task updated');
      toDoServiceSpy.updateTask.and.returnValue(of({ "taskName": "Task updated", "completed": true, "id": "2" }));

      component.editTask();

      expect(toDoServiceSpy.updateTask).toHaveBeenCalled();
      expect(component.task.taskName).toEqual('Task updated');
      expect(component.task.isEditing).toEqual(false);
    });
  });
});
