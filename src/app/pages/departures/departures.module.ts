import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeparturesRoutingModule } from './departures-routing.module';
import { DeparturesListComponent } from './departures-list/departures-list.component';
import { DeparturesAddComponent } from './departures-add/departures-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeparturesValidateComponent } from './departures-validate/departures-validate.component';


@NgModule({
  declarations: [
    DeparturesListComponent, 
    DeparturesAddComponent, DeparturesValidateComponent
  ],
  imports: [
    CommonModule,
    DeparturesRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule,
    NgSelectModule
  ]
})
export class DeparturesModule { }
