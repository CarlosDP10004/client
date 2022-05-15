import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from 'src/app/pages/home/home.component';


import { FilterPipe } from '../../pipes/filter.pipe';
import { ThousandPipe } from '../../pipes/thousand.pipe';
import { ActivoPipe } from '../../pipes/activo.pipe';
import { UsuarioPipe } from '../../pipes/usuario.pipe';
import { DatePipe } from '@angular/common';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    TemplateComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    FilterPipe,
    ThousandPipe,
    ActivoPipe,
    UsuarioPipe,
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ModalModule.forRoot(),
  ],
  providers: [
    BsModalService,  
    DatePipe
  ],  
  exports: [
    FilterPipe,
    ThousandPipe,
    ActivoPipe,
    UsuarioPipe,
  ],
  bootstrap: [TemplateComponent]
})
export class TemplateModule { }
