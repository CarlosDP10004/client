import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { GeneralReportComponent } from './general-report/general-report.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { DepreciationComponent } from './depreciation/depreciation.component';
import { AmortizationComponent } from './amortization/amortization.component';
import { ReportByUnitsComponent } from './report-by-units/report-by-units.component';
import { ReportByStatusComponent } from './report-by-status/report-by-status.component';
import { ReportHistoryComponent } from './report-history/report-history.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [GeneralReportComponent, DepreciationComponent, AmortizationComponent, ReportByUnitsComponent, ReportByStatusComponent, ReportHistoryComponent],
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
