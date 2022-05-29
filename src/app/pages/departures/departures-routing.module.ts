import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeparturesAddComponent } from './departures-add/departures-add.component';
import { DeparturesListComponent } from './departures-list/departures-list.component';

const routes: Routes = [
  {
    path: "", 
    component: DeparturesListComponent
  },
  {
    path: "Add", 
    component: DeparturesAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeparturesRoutingModule { }
