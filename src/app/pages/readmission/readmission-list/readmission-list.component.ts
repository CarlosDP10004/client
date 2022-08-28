import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ReadmisionService } from 'src/app/core/http/readmision.service';
import Swal from 'sweetalert2';
import { ReadmissionEditComponent } from '../readmission-edit/readmission-edit.component';

@Component({
  selector: 'app-readmission-list',
  templateUrl: './readmission-list.component.html',
  styleUrls: ['./readmission-list.component.scss']
})
export class ReadmissionListComponent {

  filterpost :any;
  page: number = 1;
  assets: any[] = [];
  bsModalRef: BsModalRef;

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;

  constructor(
    private bsModalService: BsModalService,
    private readmisionService: ReadmisionService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { 
    this.showAll();
  }

  seleccion(sizeI:number){
    console.log(sizeI);
    this.number = sizeI;
    console.log(sizeI);
  }

  showAll(){
    this.readmisionService.showAll().subscribe(data => {
      Object.assign(this.assets, data);
    }, error => {
      Swal.fire({
        icon: [401, 403].indexOf(error.status) ? 'info' : 'error',
        title: [401, 403].indexOf(error.status) ? 'Información' : 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      })
    });
  }

  editAdmision(IdReadmision:number){
    this.readmisionService.changeReadmisionId(IdReadmision);
    this.bsModalRef = this.bsModalService.show(ReadmissionEditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
  }

  

}
