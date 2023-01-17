import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AddTaskDialogComponent } from './add-task-dialog.component';
import { Injectable } from '@angular/core';

/**
 * This service opens up the dialog for adding task
 */
@Injectable({
  providedIn: 'root'
})
export class AddTaskDialogService {

  constructor(public dialog: MatDialog) { }

  show(): MatDialogRef<AddTaskDialogComponent> {
    const config = {
      disableClose: true,
      width: '400px',
      autoFocus: false
    };

    return this.dialog.open(AddTaskDialogComponent, config);
  }
}
