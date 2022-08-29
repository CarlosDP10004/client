import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from 'src/app/pages/aboutus/aboutus.component';
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
        path: "Assets/Settings", 
        loadChildren: () =>
        import('../../pages/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: "Assets/Discharges", 
        loadChildren: () =>
        import('../../pages/discharges/discharges.module').then(m => m.DischargesModule)
      },
      {
        path: "Assets/Departures", 
        loadChildren: () =>
        import('../../pages/departures/departures.module').then(m => m.DeparturesModule)
      },
      {
        path: "Assets/External-Loans", 
        loadChildren: () =>
        import('../../pages/external-loans/external-loans.module').then(m => m.ExternalLoansModule)
      },
      {
        path: "Assets/Internal-Loans", 
        loadChildren: () =>
        import('../../pages/internal-loans/internal-loans.module').then(m => m.InternalLoansModule)
      },

      {
        path: "Assets/Readmisions", 
        loadChildren: () =>
        import('../../pages/readmission/readmission.module').then(m => m.ReadmissionModule)
      },
      
      {
        path: "Assets/Reports", 
        loadChildren: () =>
        import('../../pages/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: "Assets/Reports", 
        loadChildren: () =>
        import('../../pages/reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: "Assets/AboutUs", 
        component: AboutusComponent
      } ,
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
