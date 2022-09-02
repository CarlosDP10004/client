import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/http/auth.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { PermissionModel } from 'src/app/models/permission';
import Swal from 'sweetalert2';
import { ClassificationAddComponent } from '../classification-add/classification-add.component';
import { ClassificationEditComponent } from '../classification-edit/classification-edit.component';

@Component({
  selector: 'app-classification-list',
  templateUrl: './classification-list.component.html',
  styleUrls: ['./classification-list.component.scss']
})
export class ClassificationListComponent {
  filterpost :'';
  page: number = 1;
  clasifications: any[] = [];
  bsModalRef: BsModalRef;

  global: any[] = [];
  permissions: any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;

  constructor(
    private bsModalService: BsModalService,
    private clasificationService: ClasificationService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { 
    this.showAll();
    this.getPermissions();
  }

  seleccion(sizeI:number){
    
    this.number = sizeI;
    
  }

  showAll(){
    this.clasificationService.showAll().subscribe(data => {
      Object.assign(this.clasifications, data);
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

  addClasification(){
    this.bsModalRef = this.bsModalService.show(ClassificationAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
  }

  editClasification(IdClasificacion:number){
    this.clasificationService.changeClasificacionId(IdClasificacion);
    this.bsModalRef = this.bsModalService.show(ClassificationEditComponent);
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
        this.clasificationService.changeStatusClasificacion(id).subscribe(data => {
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
      this.permissions = aux.validatePermission(this.global, 'Clasificaciones');
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
