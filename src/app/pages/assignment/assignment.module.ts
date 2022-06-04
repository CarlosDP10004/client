import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentAddComponent } from './assignment-add/assignment-add.component';
import { AssignmentsListComponent } from './assignments-list/assignments-list.component';
import { AssignmentEditComponent } from './assignment-edit/assignment-edit.component';
import { AssignmentRemoveComponent } from './assignment-remove/assignment-remove.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TemplateModule } from 'src/app/shared/template/template.module';
import { AssignmentValidateComponent } from './assignment-validate/assignment-validate.component';



@NgModule({
  declarations: [    
    AssignmentAddComponent,
    AssignmentsListComponent,
    AssignmentEditComponent,
    AssignmentRemoveComponent,
    AssignmentValidateComponent,
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TemplateModule
  ]
})
export class AssignmentModule { }
