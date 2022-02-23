import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { AccountListComponent } from 'src/app/pages/account/account-list/account-list.component';
import { AssetsListComponent } from 'src/app/pages/assets/assets-list/assets-list.component';
import { ClassificationListComponent } from 'src/app/pages/classification/classification-list/classification-list.component';
import { DepartamentListComponent } from 'src/app/pages/departament/departament-list/departament-list.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProviderListComponent } from 'src/app/pages/provider/provider-list/provider-list.component';
import { RoleListComponent } from 'src/app/pages/role/role-list/role-list.component';
import { UserListComponent } from 'src/app/pages/user/user-list/user-list.component';
import { WorkStationListComponent } from 'src/app/pages/work-station/work-station-list/work-station-list.component';
import { TemplateComponent } from './template.component';

const routes: Routes = [
  {
    path: "", 
    component: TemplateComponent, 
    canActivate: [AuthGuard],
    children: [
      {path: "", component: HomeComponent},
      {path: "Assets", component: HomeComponent},
      {path: "Assets/Supplies", component: AssetsListComponent},
      {path: "Assets/Users", component: UserListComponent},
      {path: "Assets/Roles", component: RoleListComponent},
      {path: "Assets/Providers", component: ProviderListComponent},
      {path: "Assets/Departaments", component: DepartamentListComponent},
      {path: "Assets/Work-Stations", component: WorkStationListComponent},
      {path: "Assets/Accounts", component: AccountListComponent},
      {path: "Assets/Classifications", component: ClassificationListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
