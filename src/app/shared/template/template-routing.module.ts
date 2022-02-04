import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from 'src/app/pages/role/role-list/role-list.component';
import { UserListComponent } from 'src/app/pages/user/user-list/user-list.component';
import { TemplateComponent } from './template.component';

const routes: Routes = [
  {
    path: "", 
    component: TemplateComponent,   
    children: [
      {path: "Assets/Users", component: UserListComponent},
      {path: "Assets/Roles", component: RoleListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
