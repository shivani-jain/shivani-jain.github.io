import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AddTaskDialogComponent } from './add-task-dialog.component';
import { AddTaskDialogService } from './add-task-dialog.service';
import { TestBed } from '@angular/core/testing';

describe('AddTaskDialogService - ', () => {
  let service: AddTaskDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ]
    });
    service = TestBed.inject(AddTaskDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show - ', () => {
    it('should open the dialog', () => {
      const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open');
      const expectedConfig = {
        disableClose: true,
        width: '400px',
        autoFocus: false
      }

      service.show();

      expect(dialogSpy).toHaveBeenCalledWith(AddTaskDialogComponent, expectedConfig);
    });
  });
});
