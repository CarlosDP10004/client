import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/core/http/brand.service';
import { ErrorService } from 'src/app/core/http/error.service';

@Component({
  selector: 'app-brands-add',
  templateUrl: './brands-add.component.html',
  styleUrls: ['./brands-add.component.scss']
})
export class BrandsAddComponent implements OnInit {

  addBrand: FormGroup;
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private brandService: BrandService,
    private errorService: ErrorService
  ) {
    this.addBrand = this.builder.group({      
      NombreMarca: new FormControl('', [])
    });
   }

  ngOnInit(): void {
  }

  guardarProveedor(){
    let postData = {
      'NombreMarca': this.addBrand.get('NombreMarca').value
    };
    this.brandService.addBrand(postData).subscribe(data=>{
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
