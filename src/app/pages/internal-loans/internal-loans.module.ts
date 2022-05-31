import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalLoansRoutingModule } from './internal-loans-routing.module';
import { InternalLoansAddComponent } from './internal-loans-add/internal-loans-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { InternalLoansListComponent } from './internal-loans-list/internal-loans-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { InternalLoansValidateComponent } from './internal-loans-validate/internal-loans-validate.component';


@NgModule({
  declarations: [
    InternalLoansListComponent,
    InternalLoansAddComponent,
    InternalLoansValidateComponent
  ],
  imports: [
    CommonModule,
    InternalLoansRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule,
    NgSelectModule
  ]
})
export class InternalLoansModule { }
