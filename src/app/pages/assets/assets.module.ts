import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetsRoutingModule } from './assets-routing.module';
import { AssetsEditComponent } from './assets-edit/assets-edit.component';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { AssetsAddComponent } from './assets-add/assets-add.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';


@NgModule({
  declarations: [    
    AssetsEditComponent,
    AssetsListComponent,
    AssetsAddComponent,
  ],
  imports: [
    CommonModule,
    AssetsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class AssetsModule { }
