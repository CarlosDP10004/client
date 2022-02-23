import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/core/http/assets.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})
export class AssetsListComponent {
  page: number = 1;
  assets: any[] = [];

  constructor(
    private assetService: AssetsService
  ) { 
    this.showAll();
  }

  showAll(){
    this.assetService.showAll().subscribe(data => {
      Object.assign(this.assets, data);
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

  addAsset(){

  }

  editAsset(){

  }

  changeStatus(){

  }

}
