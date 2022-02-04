import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TemplateModule } from './shared/template/template.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './core/http/interceptor.service';
import { UseraddComponent } from './pages/user/useradd/useradd.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { RoleListComponent } from './pages/role/role-list/role-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UseraddComponent,
    RoleListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    TemplateModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [
    {      
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
