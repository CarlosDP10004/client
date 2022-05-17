import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { ProfileComponent } from '../profile/profile.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: "", 
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "Assets/Profile", 
    canActivate: [AuthGuard],
    component: ProfileComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class LoginRoutingModule { }
