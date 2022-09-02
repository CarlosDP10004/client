import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/http/auth.service';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { PermissionModel } from 'src/app/models/permission';
import Swal from 'sweetalert2';
import { DepartamentAddComponent } from '../departament-add/departament-add.component';
import { DepartamentEditComponent } from '../departament-edit/departament-edit.component';

@Component({
  selector: 'app-departament-list',
  templateUrl: './departament-list.component.html',
  styleUrls: ['./departament-list.component.scss']
})
export class DepartamentListComponent {

  page: number = 1;
  departamento: any;
  departaments: any[] = [];
  bsModalRef: BsModalRef;


  global: any[] = [];
  permissions: any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;

  constructor(
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private authService: AuthService,
    private departamentService: DepartamentsService
  ) {
    this.showAll();
    this.getPermissions();
   }


   seleccion(sizeI:number){
    
    this.number = sizeI;
    
  }

  showAll(){
    this.departamentService.showAll().subscribe(data => {
      Object.assign(this.departaments, data);
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



  addDepartament(){
    this.bsModalRef = this.bsModalService.show(DepartamentAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    }); 
  }

  editDepartament(IdUnidad:number){
    this.departamentService.changeDepartamentId(IdUnidad);
    this.bsModalRef = this.bsModalService.show(DepartamentEditComponent);
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
        this.departamentService.changeStatusDepartament(id).subscribe(data => {
          this.toastr.success(data.toString());
          this.showAll();
        }, (error)=>{
          this.toastr.error(this.errorService.getErrorMessage(error.error));
        });
      }
    })
  }

getPermissions(){
    let aux = new PermissionModel();
    this.authService.getPermission().subscribe(async data => {
      Object.assign(this.global, data);
      this.permissions = aux.validatePermission(this.global, 'Unidades');
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
