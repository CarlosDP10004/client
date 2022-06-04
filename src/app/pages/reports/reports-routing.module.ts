import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmortizationComponent } from './amortization/amortization.component';
import { DepreciationComponent } from './depreciation/depreciation.component';
import { GeneralReportComponent } from './general-report/general-report.component';
import { ReportByStatusComponent } from './report-by-status/report-by-status.component';
import { ReportByUnitsComponent } from './report-by-units/report-by-units.component';
import { ReportHistoryComponent } from './report-history/report-history.component';

const routes: Routes = [
  {
    path: "General", 
    component: GeneralReportComponent
  },
  {
    path: "Depreciation", 
    component: DepreciationComponent
  },  
  {
    path: "Amortization", 
    component: AmortizationComponent
  },  
  {
    path: "By-Units", 
    component: ReportByUnitsComponent
  },  
  {
    path: "By-Status", 
    component: ReportByStatusComponent
  },  
  {
    path: "History-of-assignments", 
    component: ReportHistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
