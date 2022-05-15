import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NotfoundComponent } from './shared/notfound/notfound.component';

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
    import('./pages/login/login.module').then(m => m.LoginModule)
  }, 
  {
    path: 'login',
    loadChildren: () =>
    import('./pages/login/login.module').then(m => m.LoginModule)
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
