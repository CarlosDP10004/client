import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalLoansRoutingModule } from './internal-loans-routing.module';
import { InternalLoansAddComponent } from './internal-loans-add/internal-loans-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { InternalLoansListComponent } from './internal-loans-list/internal-loans-list.component';


@NgModule({
  declarations: [
    InternalLoansListComponent,
    InternalLoansAddComponent
  ],
  imports: [
    CommonModule,
    InternalLoansRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class InternalLoansModule { }
