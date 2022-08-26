import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/core/http/assets.service';
import { ErrorService } from 'src/app/core/http/error.service';
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

  constructor(
    private assetService: AssetsService,
    private errorService: ErrorService,
    private router: Router

  ) { 
    this.showAll();
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

}
