import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/http/user.service';
import { UseraddComponent } from '../useradd/useradd.component';
import { UsereditComponent } from '../useredit/useredit.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/http/auth.service';
import { PermissionModel } from 'src/app/models/permission';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  filter3: any;
  page: number = 1;
  users: any[] = [];
  bsModalRef: BsModalRef;

  global: any[] = [];
  permissions: any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;


  constructor(
    private userService: UserService,
    private bsModalService: BsModalService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { 
    this.showAll();
    this.getPermissions();
  }


  seleccion(sizeI:number){
    
    this.number = sizeI;
    
  }

  showAll(){
    this.userService.showAll().subscribe(data => {
      Object.assign(this.users, data);
    }, error => {
      Swal.fire({
        icon: [401, 403].indexOf(error.status) ? 'info' : 'error',
        title: [401, 403].indexOf(error.status) ? 'Información' : 'Error',
        text: error,
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      })
    });
  }


  addUser() {
    this.bsModalRef = this.bsModalService.show(UseraddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });    
  }


  editUser(IdUsuario:number){
    this.userService.changeUsuarioId(IdUsuario);
    this.bsModalRef = this.bsModalService.show(UsereditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.showAll();
        }, 5000);
      }
    });
  }

  changeStatus(id:number){
    Swal.fire({
      title: '¿Seguro que desea continuar?',
      text: "Se cambiará el estado del usuario.",
      icon: 'warning',
      showCancelButton: true,      
      cancelButtonColor: '#c9a892',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.changeStatusUser(id).subscribe(data => {
          this.toastr.success(data.toString());
          this.showAll();
        }, (error)=>{
          this.toastr.error(error.toString());
        });
      }
    })
  }

  getPermissions(){
    let aux = new PermissionModel();
    this.authService.getPermission().subscribe(async data => {
      Object.assign(this.global, data);
      this.permissions = aux.validatePermission(this.global, 'Usuarios');
    }, error =>{
      console.log(error);
    });
}


validate(permission: string){
    let authorized = false;
    this.permissions.forEach(x => {       
      if(x.name.includes(permission)){
        authorized = true;
      }
    });
    return authorized;
}


get agregar() { return this.validate('Agregar'); }
get editar() { return this.validate('Editar'); }

}
