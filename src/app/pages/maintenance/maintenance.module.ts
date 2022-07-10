import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceAddComponent } from './maintenance-add/maintenance-add.component';
import { MaintenanceEditComponent } from './maintenance-edit/maintenance-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { MaintenanceDetailsComponent } from './maintenance-details/maintenance-details.component';


@NgModule({
  declarations: [MaintenanceListComponent, MaintenanceAddComponent, MaintenanceEditComponent, MaintenanceDetailsComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class MaintenanceModule { }
