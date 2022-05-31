import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalLoansAddComponent } from './internal-loans-add/internal-loans-add.component';
import { InternalLoansListComponent } from './internal-loans-list/internal-loans-list.component';
import { InternalLoansValidateComponent } from './internal-loans-validate/internal-loans-validate.component';

const routes: Routes = [
  {
    path: "", 
    component: InternalLoansListComponent
  },
  {
    path: "Add", 
    component: InternalLoansAddComponent
  },
  {
    path: "Edit/:id", 
    component: InternalLoansValidateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalLoansRoutingModule { }
