import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/core/http/brand.service';
import Swal from 'sweetalert2';
import { BrandsAddComponent } from '../brands-add/brands-add.component';
import { BrandsEditComponent } from '../brands-edit/brands-edit.component';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  page: number = 1;
  brands: any[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
    private brandService: BrandService,
    private toastr: ToastrService
  ) { 
    this.showAll();
  }

  showAll() {
    this.brandService.showAll().subscribe(data => {
      Object.assign(this.brands, data);
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

  ngOnInit(): void {
  }

  addProvider(){
    this.bsModalRef = this.bsModalService.show(BrandsAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    }); 
  }


  editBrand(IdBrand:number){
    this.brandService.changeBrandId(IdBrand);
    this.bsModalRef = this.bsModalService.show(BrandsEditComponent);
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
        this.brandService.changeStatusBrand(id).subscribe(data => {
          this.toastr.success(data.toString());
          this.showAll();
        }, (error)=>{
          this.toastr.error(error.toString());
        });
      }
    })
  }

}
