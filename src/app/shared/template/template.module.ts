import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from 'src/app/pages/home/home.component';


@NgModule({
  declarations: [
    TemplateComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ],
  providers: [],
  bootstrap: [TemplateComponent]
})
export class TemplateModule { }
