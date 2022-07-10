import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintenanceAddComponent } from './maintenance-add/maintenance-add.component';
import { MaintenanceDetailsComponent } from './maintenance-details/maintenance-details.component';
import { MaintenanceEditComponent } from './maintenance-edit/maintenance-edit.component';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';

const routes: Routes = [
  {
    path: "", 
    component: MaintenanceListComponent
  },
  {
    path: "Add", 
    component: MaintenanceAddComponent
  },
  {
    path: "Edit", 
    component: MaintenanceEditComponent
  },
  {
    path: "Details", 
    component: MaintenanceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
