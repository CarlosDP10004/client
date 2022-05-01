import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountListComponent } from 'src/app/pages/account/account-list/account-list.component';
import { AssetsAddComponent } from 'src/app/pages/assets/assets-add/assets-add.component';
import { AssetsEditComponent } from 'src/app/pages/assets/assets-edit/assets-edit.component';
import { AssetsListComponent } from 'src/app/pages/assets/assets-list/assets-list.component';
import { AssignmentAddComponent } from 'src/app/pages/assignment/assignment-add/assignment-add.component';
import { AssignmentsListComponent } from 'src/app/pages/assignment/assignments-list/assignments-list.component';
import { BrandsListComponent } from 'src/app/pages/brands/brands-list/brands-list.component';
import { ClassificationListComponent } from 'src/app/pages/classification/classification-list/classification-list.component';
import { DepartamentListComponent } from 'src/app/pages/departament/departament-list/departament-list.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { ProviderListComponent } from 'src/app/pages/provider/provider-list/provider-list.component';
import { RoleListComponent } from 'src/app/pages/role/role-list/role-list.component';
import { UserListComponent } from 'src/app/pages/user/user-list/user-list.component';
import { WorkStationListComponent } from 'src/app/pages/work-station/work-station-list/work-station-list.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { TemplateComponent } from './template.component';

const routes: Routes = [
  {
    path: "", 
    component: TemplateComponent,
    children: [
      {path: "", component: HomeComponent},
      {path: "Assets", component: HomeComponent},
      {path: "Assets/Supplies", component: AssetsListComponent},
      {path: "Assets/Supplies/Add", component: AssetsAddComponent},
      {path: "Assets/Supplies/Edit/:id", component: AssetsEditComponent},
      {path: "Assets/Assignments", component: AssignmentsListComponent},
      {path: "Assets/Assignment/Add", component: AssignmentAddComponent},
      {path: "Assets/Users", component: UserListComponent},
      {path: "Assets/Roles", component: RoleListComponent},
      {path: "Assets/Providers", component: ProviderListComponent},
      {path: "Assets/Brands", component: BrandsListComponent},
      {path: "Assets/Departaments", component: DepartamentListComponent},
      {path: "Assets/Work-Stations", component: WorkStationListComponent},
      {path: "Assets/Accounts", component: AccountListComponent},
      {path: "Assets/Classifications", component: ClassificationListComponent},
      {path: "Unauthorized", component: UnauthorizedComponent},  
      {path: "Assets/Profile", component: ProfileComponent}    
    ]
  },
  {path: '**', redirectTo: 'NotFound'}, 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
