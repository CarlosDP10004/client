import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import Swal from 'sweetalert2';
import { DepartamentAddComponent } from '../departament-add/departament-add.component';
import { DepartamentEditComponent } from '../departament-edit/departament-edit.component';

@Component({
  selector: 'app-departament-list',
  templateUrl: './departament-list.component.html',
  styleUrls: ['./departament-list.component.scss']
})
export class DepartamentListComponent {

  page: number = 1;
  departaments: any[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private departamentService: DepartamentsService
  ) {
    this.showAll();
   }


  showAll(){
    this.departamentService.showAll().subscribe(data => {
      Object.assign(this.departaments, data);
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



  addDepartament(){
    this.bsModalRef = this.bsModalService.show(DepartamentAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    }); 
  }

  editDepartament(IdUnidad:number){
    this.departamentService.changeDepartamentId(IdUnidad);
    this.bsModalRef = this.bsModalService.show(DepartamentEditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
  }

  changeStatus(){

  }

}
