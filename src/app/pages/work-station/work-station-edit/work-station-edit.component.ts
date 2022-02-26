import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { WorkStationService } from 'src/app/core/http/work-station.service';
import { WorkStation } from 'src/app/models/work-station';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-station-edit',
  templateUrl: './work-station-edit.component.html',
  styleUrls: ['./work-station-edit.component.scss']
})
export class WorkStationEditComponent implements OnInit {
  editWorkStation: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  units: any[] = [];
  id: number;
  workStationData: any;

  constructor(
    private builder: FormBuilder, 
    private workStationService: WorkStationService, 
    private departamentService: DepartamentsService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) {
    this.editWorkStation = this.builder.group({
      IdUnidad: new FormControl(null, []),
      NombrePlaza: new FormControl('', [])
    });
    this.departamentService.showAll().subscribe(data => {
      Object.assign(this.units, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.workStationService.IdPlaza.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.workStationService.getWorkStation(this.id).subscribe(data => {
          this.workStationData = data;
          
          if (this.editWorkStation!=null && this.workStationData!=null) {
            this.editWorkStation.controls['NombrePlaza'].setValue(this.workStationData.NombrePlaza);
            this.editWorkStation.controls['IdUnidad'].setValue(this.workStationData.IdUnidad);
          }
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
    });
  }

  ngOnInit(): void {
  }

  guardarPlaza(){
    let workStationData = {
      'NombrePlaza': this.editWorkStation.get('NombrePlaza').value,
      'IdUnidad': this.editWorkStation.get('IdUnidad').value,
    };
    this.workStationService.editWorkStation(this.id, workStationData).subscribe(data => {       
      if(data!=null){
        this.event.emit('OK');
        this.toastr.success(data.toString());
        this.bsModalRef.hide();
      }
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
