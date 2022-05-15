import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentAddComponent } from './assignment-add/assignment-add.component';
import { AssignmentEditComponent } from './assignment-edit/assignment-edit.component';
import { AssignmentsListComponent } from './assignments-list/assignments-list.component';

const routes: Routes = [
  {
    path: "", 
    component: AssignmentsListComponent
  },
  {
    path: "Add", 
    component: AssignmentAddComponent
  },
  {
    path: "Edit/:id", 
    component: AssignmentEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentRoutingModule { }
