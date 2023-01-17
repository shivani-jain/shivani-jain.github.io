import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddTaskDialogComponent } from './add-task/add-task-dialog.component';
import { CommonModule } from '@angular/common';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { FilterPipe } from '../pipe/filter.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ViewListComponent } from './view-list/view-list.component';

@NgModule({
  declarations: [
    ViewListComponent,
    EditTaskComponent,
    FilterPipe,
    AddTaskDialogComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    FlexLayoutModule,
    MatIconModule
  ]
})
export class TodoListModule { }
