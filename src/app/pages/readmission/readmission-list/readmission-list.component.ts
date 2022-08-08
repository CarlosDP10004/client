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

  constructor(
    private bsModalService: BsModalService,
    private readmisionService: ReadmisionService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) { 
    this.showAll();
  }

  showAll(){
    this.readmisionService.showAll().subscribe(data => {
      Object.assign(this.assets, data);
      console.log(this.assets);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
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