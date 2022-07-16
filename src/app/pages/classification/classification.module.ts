import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassificationRoutingModule } from './classification-routing.module';
import { ClassificationEditComponent } from './classification-edit/classification-edit.component';
import { ClassificationListComponent } from './classification-list/classification-list.component';
import { ClassificationAddComponent } from './classification-add/classification-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from "@ng-select/ng-select";
import { TemplateModule } from 'src/app/shared/template/template.module';

@NgModule({
  declarations: [    
    ClassificationEditComponent,
    ClassificationListComponent,
    ClassificationAddComponent,
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgSelectModule,
    TemplateModule
  ]
})
export class ClassificationModule { }
