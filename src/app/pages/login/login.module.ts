import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from '../profile/profile.component';
import { TemplateModule } from 'src/app/shared/template/template.module';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent 
  ],
  imports: [
    CommonModule,
    LoginRoutingModule, 
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class LoginModule { }
