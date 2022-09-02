import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AuthService } from 'src/app/core/http/auth.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { MaintenanceService } from 'src/app/core/http/maintenance.service';
import { PermissionModel } from 'src/app/models/permission';
import Swal from 'sweetalert2';
import { MaintenanceAddComponent } from '../maintenance-add/maintenance-add.component';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.scss']
})
export class MaintenanceListComponent implements OnInit {

  filter4: any;  
  page: number = 1;
  maintenances: any[] = [];
  bsModalRef: BsModalRef;
  requestData: any;
  id: any;
  code: string;

  global: any[] = [];
  permissions: any[] = [];

  number: number = 10;
  pageSize = 10;
  pageSizes = [10,20,30,50,100];
  sizeI:number;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private maintenanceService: MaintenanceService,
    private assetsService: AssetsService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.getAssetCode(params['id']);
      this.id = params['id'];
    })    
    this.showAll(this.id);
    this.getPermissions();
  }

  seleccion(sizeI:number){
    
    this.number = sizeI;
    
  }

  showAll(idAsset: any){
    this.maintenanceService.showAll(idAsset).subscribe(data => {      
      Object.assign(this.maintenances, data);
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

  addMaintenance(){    
    this.router.navigate(['/Assets/Supplies/Maintenance/Add'], {queryParams: {id: this.id}});
  }

  editMaintenance(IdMaintenance:number){
    this.router.navigate(['/Assets/Supplies/Maintenance/Edit/'], {queryParams: {asset: this.id, id: IdMaintenance}});
  }

  detailsMaintenance(IdMaintenance:number){
    this.router.navigate(['/Assets/Supplies/Maintenance/Details/'], {queryParams: {asset: this.id, id: IdMaintenance}});
  }

  getAssetCode(id: any){
    this.assetsService.getAsset(id).subscribe(data => {
      this.requestData = data;
      this.code = this.requestData.CodigoAF;
    }, error =>{
      this.toastr.success(error.toString());
    });
  }

  getPermissions(){
    let aux = new PermissionModel();
    this.authService.getPermission().subscribe(async data => {
      Object.assign(this.global, data);
      this.permissions = aux.validatePermission(this.global, 'Mantenimientos');
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
