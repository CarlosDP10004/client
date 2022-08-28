import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { UserService } from 'src/app/core/http/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departament-add',
  templateUrl: './departament-add.component.html',
  styleUrls: ['./departament-add.component.scss']
})
export class DepartamentAddComponent implements OnInit {
  addDepartament: FormGroup;
  users: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private departamentService: DepartamentsService,
    private errorService: ErrorService
  ) {
    this.addDepartament = this.builder.group({   
      CodigoUnidad: new FormControl('', []),
      NombreUnidad: new FormControl('', []),
      IdUsuario: new FormControl(null, [])
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
  }

  ngOnInit(): void {
  }


  guardarDepartamento(){
    let postData = {
      'CodigoUnidad': this.addDepartament.get('CodigoUnidad').value,
      'NombreUnidad': this.addDepartament.get('NombreUnidad').value,
      'IdUsuario': this.addDepartament.get('IdUsuario').value
    };
    this.departamentService.addDepartament(postData).subscribe(data=>{
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
