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
  permisos: any[] = [];
  employees: any[] = [];
  seleccion: any;
  id: number;
  userData: any;
  options = [{id:1, name: 'Roles'},{id:2, name:'Permisos'}];
  selected: number;

  usersAD: any[] = [];

  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private builder: FormBuilder, 
    private userService: UserService, 
    private rolService: RolesService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(){    
    this.editUser = this.builder.group({
      Roles: new FormControl(this.builder.array([])),
      Permisos: new FormControl(this.builder.array([])),
      NombreUsuario: new FormControl('', []),
      Tipo: new FormControl('', []),
      IdEmpleado: new FormControl('', []),
      Contrasenna: new FormControl('', [])
    });
    this.rolService.showAll().subscribe(data => {
      Object.assign(this.roles, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.rolService.getPermisos().subscribe(data => {
      Object.assign(this.permisos, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.userService.getUsersFromAD().subscribe(data => {
      Object.assign(this.usersAD, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.userService.IdUsuario.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.userService.getUser(this.id).subscribe(async data => {
          this.userData = data;
          
          if (this.editUser!=null && this.userData!=null) {
            this.editUser.controls['Roles'].setValue(await this.getRolesIds(this.id));
            this.editUser.controls['Permisos'].setValue(await this.getPermissionIds(this.id));
            this.editUser.controls['NombreUsuario'].setValue(this.userData.NombreUsuario);
            this.editUser.controls['IdEmpleado'].setValue(this.userData.IdEmpleado);
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

  editarUsuario(){
    if(this.editUser.get('Tipo').value == 1){
      let withRole = {
        'NombreUsuario': this.editUser.get('NombreUsuario').value,
        'Contrasenna': this.editUser.get('Contrasenna').value,
        'IdEmpleado': this.editUser.get('IdEmpleado').value,
        'Roles': this.editUser.get('Roles').value,
      };
  
      this.userService.editUser(this.id, withRole).subscribe(data => {      
          this.event.emit('OK');
          this.toastr.success(data.toString());
          this.bsModalRef.hide();      
      }, (error)=>{      
        this.toastr.error(this.errorService.getErrorMessage(error.error));
      });
    }
    if(this.editUser.get('Tipo').value == 2){
      let withPermission = {
        'NombreUsuario': this.editUser.get('NombreUsuario').value,
        'Contrasenna': this.editUser.get('Contrasenna').value,
        'IdEmpleado': this.editUser.get('IdEmpleado').value,
        'Permisos': this.editUser.get('Permisos').value,
      };  
      this.userService.editUserPermission(this.id, withPermission).subscribe(data => {      
          this.event.emit('OK');
          this.toastr.success(data.toString());
          this.bsModalRef.hide();      
      }, (error)=>{      
        this.toastr.error(this.errorService.getErrorMessage(error.error));
      });

    }
    
  }

  onClose() {
    this.bsModalRef.hide();
  }


  getRolesIds(idUser): any{ 
    return new Promise((resolved, reject) => {
      this.userService.getRolesByUser(idUser).subscribe(data => {
        resolved(data);
      }, error => { 
        reject(error);
        console.log('Error al obtener datos.'); });      
    }); 
  }
  getPermissionIds(idUser): any{
    return new Promise((resolved, reject) => {
      this.userService.getPermisosByUser(idUser).subscribe(data => {
        resolved(data);
      }, error => { 
        reject(error);
        console.log('Error al obtener datos.'); });      
    }); 
  }


}
