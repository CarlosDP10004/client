import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DischargesRoutingModule } from './discharges-routing.module';
import { DischargesListComponent } from './discharges-list/discharges-list.component';
import { DischargesAddComponent } from './discharges-add/discharges-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DischargesValidateComponent } from './discharges-validate/discharges-validate.component';


@NgModule({
  declarations: [
    DischargesListComponent, 
    DischargesAddComponent, DischargesValidateComponent
  ],
  imports: [
    CommonModule,
    DischargesRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule,
    NgSelectModule
  ]
})
export class DischargesModule { }
