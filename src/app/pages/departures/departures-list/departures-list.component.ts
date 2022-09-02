import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/http/auth.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { RequestService } from 'src/app/core/http/request.service';
import { PermissionModel } from 'src/app/models/permission';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departures-list',
  templateUrl: './departures-list.component.html',
  styleUrls: ['./departures-list.component.scss']
})
export class DeparturesListComponent implements OnInit {

  filter7: any;  
  page: number = 1;
  requests: any[] = [];

  global: any[] = [];
  permissions: any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;

  constructor(
    private requestService: RequestService,
    private errorService: ErrorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showAll();
    this.getPermissions();
  }

  seleccion(sizeI:number){
    
    this.number = sizeI;
    
  }

  showAll(){
    this.requestService.showAll('Salida').subscribe(data => {      
      Object.assign(this.requests, data);
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

  validateRequest(IdRequest:number){
    this.router.navigate(['/Assets/Departures/Validate/', IdRequest]);
  }

  detailsRequest(IdRequest:number){
    this.router.navigate(['/Assets/Departures/Details/', IdRequest]);
  }

  getPermissions(){
    let aux = new PermissionModel();
    this.authService.getPermission().subscribe(async data => {
      Object.assign(this.global, data);
      this.permissions = aux.validatePermission(this.global, 'Salidas');
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
get validar() { return this.validate('Validar'); }
}
