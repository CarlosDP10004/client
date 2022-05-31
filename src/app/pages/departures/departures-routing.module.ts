import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeparturesAddComponent } from './departures-add/departures-add.component';
import { DeparturesListComponent } from './departures-list/departures-list.component';
import { DeparturesValidateComponent } from './departures-validate/departures-validate.component';

const routes: Routes = [
  {
    path: "", 
    component: DeparturesListComponent
  },
  {
    path: "Add", 
    component: DeparturesAddComponent
  },
  {
    path: "Edit/:id", 
    component: DeparturesValidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeparturesRoutingModule { }
