import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalLoansRoutingModule } from './external-loans-routing.module';
import { ExternalLoansListComponent } from './external-loans-list/external-loans-list.component';
import { ExternalLoansAddComponent } from './external-loans-add/external-loans-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';


@NgModule({
  declarations: [
    ExternalLoansListComponent, 
    ExternalLoansAddComponent
  ],
  imports: [
    CommonModule,
    ExternalLoansRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class ExternalLoansModule { }
