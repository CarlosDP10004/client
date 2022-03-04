import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/http/error.service';
import { RolesService } from 'src/app/core/http/roles.service';
import { UserService } from 'src/app/core/http/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.scss']
})
export class UsereditComponent implements OnInit {

  editUser: FormGroup;
  roles: any[] = [];
  employees: any[] = [];
  seleccion: any;
  id: number;
  userData: any;

  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private builder: FormBuilder, 
    private userService: UserService, 
    private rolService: RolesService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { 
    this.editUser = this.builder.group({
      Roles: new FormControl(this.builder.array([])),
      NombreUsuario: new FormControl('', []),
      IdEmpleado: new FormControl('', []),
      Contrasenna: new FormControl('', [])
    });

    this.rolService.showAll().subscribe(data => {
      Object.assign(this.roles, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
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
        text: error,
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.userService.IdUsuario.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.userService.getUser(this.id).subscribe(data => {
          this.userData = data;
          
          if (this.editUser!=null && this.userData!=null) {
            this.editUser.controls['Roles'].setValue(this.userData.roles);
            console.log(this.editUser.controls['Roles'])
            this.editUser.controls['NombreUsuario'].setValue(this.userData.NombreUsuario);
            this.editUser.controls['IdEmpleado'].setValue(this.userData.IdEmpleado);
            this.editUser.controls['Contrasenna'].setValue(this.userData.Contrasenna);
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

  editarUsuario(){
    let userData = {
      'NombreUsuario': this.editUser.get('NombreUsuario').value,
      'Contrasenna': this.editUser.get('Contrasenna').value,
      'IdEmpleado': this.editUser.get('IdEmpleado').value,
      'Roles': this.editUser.get('Roles').value,
    };

    console.log(userData);

    this.userService.editUser(this.id, userData).subscribe(data => {      
        this.event.emit('OK');
        this.toastr.success(data.toString());
        this.bsModalRef.hide();      
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }


}
