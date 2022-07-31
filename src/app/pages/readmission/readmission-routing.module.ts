import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadmissionEditComponent } from './readmission-edit/readmission-edit.component';
import { ReadmissionListComponent } from './readmission-list/readmission-list.component';

const routes: Routes = [
  {
    path: "", 
    component: ReadmissionListComponent
  },
  {
    path: "Edit/:id", 
    component: ReadmissionEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadmissionRoutingModule { }
