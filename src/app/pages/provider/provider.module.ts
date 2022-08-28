import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviderRoutingModule } from './provider-routing.module';
import { ProviderListComponent } from './provider-list/provider-list.component';
import { ProviderAddComponent } from './provider-add/provider-add.component';
import { ProviderEditComponent } from './provider-edit/provider-edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [    
    ProviderListComponent,
    ProviderAddComponent,
    ProviderEditComponent,  
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule,    
    NgSelectModule,
    NgxMaskModule.forRoot(),
  ]
})
export class ProviderModule { }
