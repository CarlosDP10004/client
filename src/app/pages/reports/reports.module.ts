import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { GeneralReportComponent } from './general-report/general-report.component';


@NgModule({
  declarations: [GeneralReportComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule,
    NgSelectModule
  ]
})
export class ReportsModule { }
