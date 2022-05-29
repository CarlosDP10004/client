import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsEditComponent } from './assets-edit/assets-edit.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { AssetsAddComponent } from './assets-add/assets-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from "@ng-select/ng-select";
import { TemplateModule } from 'src/app/shared/template/template.module';
import { AssetsTimelineComponent } from './assets-timeline/assets-timeline.component';


@NgModule({
  declarations: [    
    AssetsEditComponent,
    AssetsListComponent,
    AssetsAddComponent,
    AssetsTimelineComponent,
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule,
    NgSelectModule
  ]
})
export class AssetsModule { }
