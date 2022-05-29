import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExternalLoansAddComponent } from './external-loans-add/external-loans-add.component';
import { ExternalLoansListComponent } from './external-loans-list/external-loans-list.component';

const routes: Routes = [
  {
    path: "", 
    component: ExternalLoansListComponent
  },
  {
    path: "Add", 
    component: ExternalLoansAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalLoansRoutingModule { }
