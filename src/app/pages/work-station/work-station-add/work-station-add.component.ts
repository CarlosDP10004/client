import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { UserService } from 'src/app/core/http/user.service';
import { WorkStationService } from 'src/app/core/http/work-station.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-station-add',
  templateUrl: './work-station-add.component.html',
  styleUrls: ['./work-station-add.component.scss']
})
export class WorkStationAddComponent implements OnInit {
  addWorkStation: FormGroup;
  units: any[] = [];
  employees: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private departamentService: DepartamentsService,
    private workStationService: WorkStationService,
    private userService: UserService,
    private errorService: ErrorService
  ) { 
    this.addWorkStation = this.builder.group({      
      NombrePlaza: new FormControl('', []),
      IdUnidad: new FormControl('', []),
      IdEmpleado: new FormControl('', [])
    });
    this.departamentService.showAll().subscribe(data => {
      Object.assign(this.units, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.userService.getEmployees().subscribe(data => {
      Object.assign(this.employees, data);
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

  ngOnInit(): void {
  }

  guardarPlaza(){
    let postData = {
      'NombrePlaza': this.addWorkStation.get('NombrePlaza').value,
      'IdUnidad': this.addWorkStation.get('IdUnidad').value,
      'IdEmpleado': this.addWorkStation.get('IdEmpleado').value,
    };
    this.workStationService.addWorkStation(postData).subscribe(data=>{
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
