import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { TemplateModule } from './shared/template/template.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './core/http/interceptor.service';
import { UseraddComponent } from './pages/user/useradd/useradd.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { UsereditComponent } from './pages/user/useredit/useredit.component';
import { ToastrModule } from 'ngx-toastr';
import { RoleAddComponent } from './pages/role/role-add/role-add.component';
import { ProviderListComponent } from './pages/provider/provider-list/provider-list.component';
import { ProviderAddComponent } from './pages/provider/provider-add/provider-add.component';
import { ProviderEditComponent } from './pages/provider/provider-edit/provider-edit.component';
import { DepartamentListComponent } from './pages/departament/departament-list/departament-list.component';
import { DepartamentAddComponent } from './pages/departament/departament-add/departament-add.component';
import { DepartamentEditComponent } from './pages/departament/departament-edit/departament-edit.component';
import { WorkStationEditComponent } from './pages/work-station/work-station-edit/work-station-edit.component';
import { WorkStationListComponent } from './pages/work-station/work-station-list/work-station-list.component';
import { WorkStationAddComponent } from './pages/work-station/work-station-add/work-station-add.component';
import { AccountEditComponent } from './pages/account/account-edit/account-edit.component';
import { AccountListComponent } from './pages/account/account-list/account-list.component';
import { AccountAddComponent } from './pages/account/account-add/account-add.component';
import { ClassificationEditComponent } from './pages/classification/classification-edit/classification-edit.component';
import { ClassificationListComponent } from './pages/classification/classification-list/classification-list.component';
import { ClassificationAddComponent } from './pages/classification/classification-add/classification-add.component';
import { AssetsEditComponent } from './pages/assets/assets-edit/assets-edit.component';
import { AssetsListComponent } from './pages/assets/assets-list/assets-list.component';
import { AssetsAddComponent } from './pages/assets/assets-add/assets-add.component';


 
import { SpinnerModule } from './shared/spinner/spinner.module';
import { SpinnerInterceptor } from '../app/core/interceptor/spinner.interceptor';
import { FilterPipe } from './pipes/filter.pipe';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { ThousandPipe } from './pipes/thousand.pipe';
import { ActivoPipe } from './pipes/activo.pipe';
import { UsuarioPipe } from './pipes/usuario.pipe';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    UseraddComponent,
    RoleListComponent,
    UsereditComponent,
    RoleAddComponent,
    ProviderListComponent,
    ProviderAddComponent,
    ProviderEditComponent,
    DepartamentListComponent,
    DepartamentAddComponent,
    DepartamentEditComponent,
    WorkStationEditComponent,
    WorkStationListComponent,
    WorkStationAddComponent,
    AccountEditComponent,
    AccountListComponent,
    AccountAddComponent,
    ClassificationEditComponent,
    ClassificationListComponent,
    ClassificationAddComponent,
    AssetsEditComponent,
    AssetsListComponent,
    AssetsAddComponent,
    FilterPipe,
    UnauthorizedComponent,
    NotfoundComponent,
    ThousandPipe,
    ActivoPipe,
    UsuarioPipe,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    SpinnerModule,
    NgSelectModule
  ],
  providers: [
    {      
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
