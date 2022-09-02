import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { AuthService } from 'src/app/core/http/auth.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { PermissionModel } from 'src/app/models/permission';
import Swal from 'sweetalert2';
import { AccountAddComponent } from '../account-add/account-add.component';
import { AccountEditComponent } from '../account-edit/account-edit.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent {
  page: number = 1;
  cuenta: any;
  accounts: any[] = [];
  bsModalRef: BsModalRef;

  global: any[] = [];
  permissions: any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;

  constructor(
    private accountService: AccountService,
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private authService: AuthService,
    private errorService: ErrorService
  ) { 
    this.showAll();
    this.getPermissions();
  }

  seleccion(sizeI:number){
    this.number = sizeI;
  }

  showAll(){
    this.accountService.showAll().subscribe(data => {
      Object.assign(this.accounts, data);
    }, error => {
      Swal.fire({
        icon: [401, 403].indexOf(error.status) ? 'info' : 'error',
        title: [401, 403].indexOf(error.status) ? 'Información' : 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      })
    });
  }

  addAccount(){
    this.bsModalRef = this.bsModalService.show(AccountAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    }); 
  }

  editAccount(IdCuenta:number){
    this.accountService.changeAccountId(IdCuenta);
    this.bsModalRef = this.bsModalService.show(AccountEditComponent);
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
      text: "Se cambiará el estado del registro.",
      icon: 'warning',
      showCancelButton: true,      
      cancelButtonColor: '#c9a892',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.changeStatusAccount(id).subscribe(data => {
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
      this.permissions = aux.validatePermission(this.global, 'Cuentas');
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
