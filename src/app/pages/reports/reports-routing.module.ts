import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepreciationComponent } from './depreciation/depreciation.component';
import { GeneralReportComponent } from './general-report/general-report.component';

const routes: Routes = [
  {
    path: "General", 
    component: GeneralReportComponent
  },
  {
    path: "Depreciation", 
    component: DepreciationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
