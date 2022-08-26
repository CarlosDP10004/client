import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/http/auth.service';
import { ProviderService } from 'src/app/core/http/provider.service';
import { PermissionModel } from 'src/app/models/permission';
import Swal from 'sweetalert2';
import { ProviderAddComponent } from '../provider-add/provider-add.component';
import { ProviderEditComponent } from '../provider-edit/provider-edit.component';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent {

  page: number = 1;
  proveedor: any;
  providers: any[] = [];
  bsModalRef: BsModalRef;

  global: any[] = [];
  permissions: any[] = [];

  constructor(
    private bsModalService: BsModalService,
    private providerService: ProviderService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.showAll();
    this.getPermissions();
   }
  showAll() {
    this.providerService.showAll().subscribe(data => {
      Object.assign(this.providers, data);
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

  addProvider(){
    this.bsModalRef = this.bsModalService.show(ProviderAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    }); 
  }

  editProvider(IdProvider:number){
    this.providerService.changeProviderId(IdProvider);
    this.bsModalRef = this.bsModalService.show(ProviderEditComponent);
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
        this.providerService.changeStatusProvider(id).subscribe(data => {
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
      this.permissions = aux.validatePermission(this.global, 'Proveedores');
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
