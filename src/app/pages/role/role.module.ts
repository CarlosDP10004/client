import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleAddComponent } from './role-add/role-add.component';
import { RoleEditComponent } from './role-edit/role-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from "@ng-select/ng-select";
import { TemplateModule } from 'src/app/shared/template/template.module';


@NgModule({
  declarations: [
    RoleListComponent,
    RoleAddComponent, 
    RoleEditComponent,
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgSelectModule,
    TemplateModule
  ]
})
export class RoleModule { }
