import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: "", 
    component: UserListComponent
  },
  {
    path: "Profile", 
    component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
