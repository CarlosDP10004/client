import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  }, 
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'Assets',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./shared/template/template.module').then(m => m.TemplateModule)
  },
  {
    path: 'NotFound',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
