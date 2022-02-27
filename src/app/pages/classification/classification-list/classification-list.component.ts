import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import Swal from 'sweetalert2';
import { ClassificationAddComponent } from '../classification-add/classification-add.component';
import { ClassificationEditComponent } from '../classification-edit/classification-edit.component';

@Component({
  selector: 'app-classification-list',
  templateUrl: './classification-list.component.html',
  styleUrls: ['./classification-list.component.scss']
})
export class ClassificationListComponent {
  filterpost :'';
  page: number = 1;
  clasifications: any[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
    private clasificationService: ClasificationService
  ) { 
    this.showAll();
  }

  showAll(){
    this.clasificationService.showAll().subscribe(data => {
      Object.assign(this.clasifications, data);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      })
    });
  }

  addClasification(){
    this.bsModalRef = this.bsModalService.show(ClassificationAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
  }

  editClasification(IdClasificacion:number){
    this.clasificationService.changeClasificacionId(IdClasificacion);
    this.bsModalRef = this.bsModalService.show(ClassificationEditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
  }

  changeStatus(){

  }

}
