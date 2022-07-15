import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalLoansRoutingModule } from './external-loans-routing.module';
import { ExternalLoansListComponent } from './external-loans-list/external-loans-list.component';
import { ExternalLoansAddComponent } from './external-loans-add/external-loans-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExternalLoansValidateComponent } from './external-loans-validate/external-loans-validate.component';


@NgModule({
  declarations: [
    ExternalLoansListComponent, 
    ExternalLoansAddComponent, ExternalLoansValidateComponent
  ],
  imports: [
    CommonModule,
    ExternalLoansRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    TemplateModule,
    NgSelectModule
  ]
})
export class ExternalLoansModule { }
