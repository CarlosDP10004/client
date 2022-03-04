import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/core/http/brand.service';
import { ErrorService } from 'src/app/core/http/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands-edit',
  templateUrl: './brands-edit.component.html',
  styleUrls: ['./brands-edit.component.scss']
})
export class BrandsEditComponent implements OnInit {
  editBrand: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  id: number;
  brandData: any;

  constructor(
    private builder: FormBuilder, 
    private brandService: BrandService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { 
    this.editBrand = this.builder.group({
      NombreMarca: new FormControl(null, [])
    });

    this.brandService.IdMarca.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.brandService.getBrand(this.id).subscribe(data => {
          this.brandData = data;
          
          if (this.editBrand!=null && this.brandData!=null) {
            this.editBrand.controls['NombreMarca'].setValue(this.brandData.NombreMarca);
          }
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
    });
  }

  ngOnInit(): void {
  }


  guardarMarca(){
    let brandData = {
      'NombreMarca': this.editBrand.get('NombreMarca').value,
    };
    this.brandService.editBrand(this.id, brandData).subscribe(data => {       
      if(data!=null){
        this.event.emit('OK');
        this.toastr.success(data.toString());
        this.bsModalRef.hide();
      }
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
