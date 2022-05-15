import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentRoutingModule } from './departament-routing.module';
import { DepartamentListComponent } from './departament-list/departament-list.component';
import { DepartamentAddComponent } from './departament-add/departament-add.component';
import { DepartamentEditComponent } from './departament-edit/departament-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';

@NgModule({
  declarations: [
    DepartamentListComponent,
    DepartamentAddComponent,
    DepartamentEditComponent,
  ],
  imports: [
    CommonModule,
    DepartamentRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class DepartamentModule { }
