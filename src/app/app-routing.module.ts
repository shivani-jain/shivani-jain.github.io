import { RouterModule, Routes } from '@angular/router';

import { FetchTaskResolver } from './resolver/fetch-task.resolver';
import { NgModule } from '@angular/core';
import { ViewListComponent } from './todo-list/view-list/view-list.component';

const routes: Routes = [
  {path: '', component: ViewListComponent, 
  resolve: {
    taskList: FetchTaskResolver,
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
