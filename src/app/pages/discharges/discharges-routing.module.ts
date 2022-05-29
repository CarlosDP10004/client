import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DischargesAddComponent } from './discharges-add/discharges-add.component';
import { DischargesListComponent } from './discharges-list/discharges-list.component';
import { DischargesValidateComponent } from './discharges-validate/discharges-validate.component';

const routes: Routes = [
  {
    path: "", 
    component: DischargesListComponent
  },
  {
    path: "Add", 
    component: DischargesAddComponent
  },
  {
    path: "Edit/:id", 
    component: DischargesValidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DischargesRoutingModule { }
