import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadmissionRoutingModule } from './readmission-routing.module';
import { ReadmissionListComponent } from './readmission-list/readmission-list.component';
import { ReadmissionEditComponent } from './readmission-edit/readmission-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { TemplateModule } from 'src/app/shared/template/template.module';


@NgModule({
  declarations: [ReadmissionListComponent, ReadmissionEditComponent],
  imports: [
    CommonModule,
    ReadmissionRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgSelectModule,
    TemplateModule
  ]
})
export class ReadmissionModule { }
