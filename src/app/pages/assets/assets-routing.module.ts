import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsAddComponent } from './assets-add/assets-add.component';
import { AssetsEditComponent } from './assets-edit/assets-edit.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { AssetsTimelineComponent } from './assets-timeline/assets-timeline.component';

const routes: Routes = [
  {
    path: "", 
    component: AssetsListComponent
  },
  {
    path: "Add", 
    component: AssetsAddComponent
  },
  {
    path: "Edit/:id", 
    component: AssetsEditComponent
  },
  {
    path: "Timeline/:id", 
    component: AssetsTimelineComponent
  },
  {
    path: "Maintenance", 
    loadChildren: () =>
    import('../../pages/maintenance/maintenance.module').then(m => m.MaintenanceModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
