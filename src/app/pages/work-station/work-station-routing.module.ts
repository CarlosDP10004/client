import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkStationListComponent } from './work-station-list/work-station-list.component';

const routes: Routes = [
  {
    path: "", 
    component: WorkStationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkStationRoutingModule { }
