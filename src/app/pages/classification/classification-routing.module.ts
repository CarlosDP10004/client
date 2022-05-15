import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassificationListComponent } from './classification-list/classification-list.component';

const routes: Routes = [
  {
    path: "", 
    component: ClassificationListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationRoutingModule { }
