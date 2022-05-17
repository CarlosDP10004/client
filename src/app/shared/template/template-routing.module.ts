import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { TemplateComponent } from './template.component';

const routes: Routes = [
  {
    path: "", 
    component: TemplateComponent,
    children: [
      {
        path: "", 
        component: HomeComponent
      },
      {
        path: "Assets/Accounts", 
        loadChildren: () =>
        import('../../pages/account/account.module').then(m => m.AccountModule)
      },
      {
        path: "Assets/Supplies",
        loadChildren: () =>
        import('../../pages/assets/assets.module').then(m => m.AssetsModule)
      },
      {
        path: "Assets/Assignments",
        loadChildren: () =>
        import('../../pages/assignment/assignment.module').then(m => m.AssignmentModule)
      },
      {
        path: "Assets/Brands",
        loadChildren: () =>
        import('../../pages/brands/brands.module').then(m => m.BrandsModule)
      },
      {
        path: "Assets/Classifications", 
        loadChildren: () =>
        import('../../pages/classification/classification.module').then(m => m.ClassificationModule)
      },
      {
        path: "Assets/Departaments",
        loadChildren: () =>
        import('../../pages/departament/departament.module').then(m => m.DepartamentModule)
      },
      {
        path: "Assets/Providers", 
        loadChildren: () =>
        import('../../pages/provider/provider.module').then(m => m.ProviderModule)
      },
      {
        path: "Assets/Roles", 
        loadChildren: () =>
        import('../../pages/role/role.module').then(m => m.RoleModule)
      },      
      {
        path: "Assets/Users", 
        loadChildren: () =>
        import('../../pages/user/user.module').then(m => m.UserModule)
      },       
      {
        path: "Assets/Work-Stations", 
        loadChildren: () =>
        import('../../pages/work-station/work-station.module').then(m => m.WorkStationModule)
      },
      {
        path: "Unauthorized", 
        component: UnauthorizedComponent
      }   
    ]
  },
  {path: '**', redirectTo: 'NotFound'}, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
