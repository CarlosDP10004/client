import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { WorkStationService } from 'src/app/core/http/work-station.service';
import Swal from 'sweetalert2';
import { WorkStationAddComponent } from '../work-station-add/work-station-add.component';
import { WorkStationEditComponent } from '../work-station-edit/work-station-edit.component';

@Component({
  selector: 'app-work-station-list',
  templateUrl: './work-station-list.component.html',
  styleUrls: ['./work-station-list.component.scss']
})
export class WorkStationListComponent {

  page: number = 1;
  plaza: any;
  workStations: any[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
    private workStationService: WorkStationService,
    private toastr: ToastrService
  ) {
    this.showAll();
   }


  showAll(){
    this.workStationService.showAll().subscribe(data => {
      Object.assign(this.workStations, data);
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

  addWorkStation(){
    this.bsModalRef = this.bsModalService.show(WorkStationAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
  }

  editWorkStation(IdPlaza:number){
    this.workStationService.changeWorkStationId(IdPlaza);
    this.bsModalRef = this.bsModalService.show(WorkStationEditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
  }

  changeStatus(id:number){
    Swal.fire({
      title: '¿Seguro que desea continuar?',
      text: "Se cambiará el estado del registro.",
      icon: 'warning',
      showCancelButton: true,      
      cancelButtonColor: '#c9a892',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.workStationService.changeStatusWorkStation(id).subscribe(data => {
          this.toastr.success(data.toString());
          this.showAll();
        }, (error)=>{
          this.toastr.error(error.toString());
        });
      }
    })
  }

}
