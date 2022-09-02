import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AuthService } from 'src/app/core/http/auth.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { PermissionModel } from 'src/app/models/permission';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent {
  
  filter2: any;  
  page: number = 1;
  assets: any[] = []; 

  global: any[] = [];
  permissions: any[] = [];

  maintenanceList:any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;
  

  constructor(
    private assetService: AssetsService,
    private errorService: ErrorService,
    private authService: AuthService,
    private router: Router

  ) { 
    this.showAll();
    this.getPermissions();
  }

  seleccion(sizeI:number){
    this.number = sizeI;
  }

  showAll(){
    this.assetService.showAll().subscribe(data => {
      Object.assign(this.assets, data);
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

  addAsset(){

  }

  editAsset(IdAsset:number){
    this.router.navigate(['/Assets/Supplies/Edit/', IdAsset]);
  }

  changeStatus(){

  }

  watchTrace(IdAsset:number){
    this.router.navigate(['/Assets/Supplies/Timeline/', IdAsset]);
  }

  maintenance(IdAsset:number){
    this.router.navigate(['/Assets/Supplies/Maintenance'], {queryParams: {id: IdAsset}});
    //this.router.navigate(['/Assets/Supplies/Maintenance']);
  }


  getPermissions(){
    let aux = new PermissionModel();
    this.authService.getPermission().subscribe(async data => {
      Object.assign(this.global, data);
      this.permissions = aux.validatePermission(this.global, 'Activos');
      this.maintenanceList  = aux.validatePermission(this.global, 'Mantenimientos');
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

validate2(permission: string){
  let authorized = false;
  this.maintenanceList.forEach(x => {       
    if(x.name.includes(permission)){
      authorized = true;
    }
  });
  return authorized;
}


get agregar() { return this.validate('Agregar'); }
get editar() { return this.validate('Editar'); }
get historico() { return this.validate('Histórico'); }
get mantenimiento() { return (this.validate2('Lista') || this.validate2('Agregar') || this.validate2('Editar')); }


}
