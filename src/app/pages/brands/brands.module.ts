import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandsRoutingModule } from './brands-routing.module';
import { BrandsAddComponent } from './brands-add/brands-add.component';
import { BrandsListComponent } from './brands-list/brands-list.component';
import { BrandsEditComponent } from './brands-edit/brands-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppModule } from 'src/app/app.module';
import { TemplateModule } from 'src/app/shared/template/template.module';



@NgModule({
  declarations: [
    BrandsAddComponent,
    BrandsListComponent,
    BrandsEditComponent,
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class BrandsModule { }
