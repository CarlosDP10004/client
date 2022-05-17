import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkStationRoutingModule } from './work-station-routing.module';
import { WorkStationEditComponent } from './work-station-edit/work-station-edit.component';
import { WorkStationListComponent } from './work-station-list/work-station-list.component';
import { WorkStationAddComponent } from './work-station-add/work-station-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';



@NgModule({
  declarations: [
    WorkStationEditComponent,
    WorkStationListComponent,
    WorkStationAddComponent,
  ],
  imports: [
    CommonModule,
    WorkStationRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class WorkStationModule { }
