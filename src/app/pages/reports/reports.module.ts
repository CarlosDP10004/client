import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { GeneralReportComponent } from './general-report/general-report.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateModule } from 'src/app/shared/template/template.module';


@NgModule({
  declarations: [GeneralReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class ReportsModule { }