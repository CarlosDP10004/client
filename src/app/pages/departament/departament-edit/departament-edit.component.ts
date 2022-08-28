import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { UserService } from 'src/app/core/http/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departament-edit',
  templateUrl: './departament-edit.component.html',
  styleUrls: ['./departament-edit.component.scss']
})
export class DepartamentEditComponent implements OnInit {
  editDepartament: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  users: any[] = [];
  id: number;
  departamentData: any;


  constructor(
    private builder: FormBuilder, 
    private userService: UserService, 
    private departamentService: DepartamentsService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) {
    this.editDepartament = this.builder.group({
      CodigoUnidad:new FormControl('', []),
      IdUsuario: new FormControl(null, []),
      NombreUnidad: new FormControl('', [])
    });
    this.userService.showAll().subscribe(data => {
      Object.assign(this.users, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.departamentService.IdUnidad.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.departamentService.getDepartament(this.id).subscribe(data => {
          this.departamentData = data;
          
          if (this.editDepartament!=null && this.departamentData!=null) {
            this.editDepartament.controls['CodigoUnidad'].setValue(this.departamentData.CodigoUnidad);
            this.editDepartament.controls['NombreUnidad'].setValue(this.departamentData.NombreUnidad);
            this.editDepartament.controls['IdUsuario'].setValue(this.departamentData.IdUsuario);
          }
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
    });

  }

  ngOnInit(): void {
  }

  guardarDepartamento(){
    let departamentData = {
      'CodigoUnidad': this.editDepartament.get('CodigoUnidad').value,
      'NombreUnidad': this.editDepartament.get('NombreUnidad').value,
      'IdUsuario': this.editDepartament.get('IdUsuario').value,
    };
    this.departamentService.editDepartament(this.id, departamentData).subscribe(data => {       
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
