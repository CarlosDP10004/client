import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { TemplateModule } from 'src/app/shared/template/template.module';


@NgModule({
  declarations: [
    SettingsListComponent,
    SettingsEditComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgSelectModule,
    TemplateModule
  ]
})
export class SettingsModule { }
