import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './shared/template/template.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './core/http/interceptor.service';
import { SpinnerModule } from './shared/spinner/spinner.module';
import { SpinnerInterceptor } from '../app/core/interceptor/spinner.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnauthorizedComponent } from './shared/unauthorized/unauthorized.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';



@NgModule({
  declarations: [
    AppComponent, 
    UnauthorizedComponent,
    NotfoundComponent,       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TemplateModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SpinnerModule,
  ],
  providers: [
    {      
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
