import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/http/user.service';
import { UseraddComponent } from '../useradd/useradd.component';
import { UsereditComponent } from '../useredit/useredit.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  page: number = 1;
  users: any[] = [];
  bsModalRef: BsModalRef;
  constructor(
    private userService: UserService,
    private bsModalService: BsModalService,
    private toastr: ToastrService
  ) { 
    this.showAll();
  }


  showAll(){
    this.userService.showAll().subscribe(data => {
      Object.assign(this.users, data);
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

}
