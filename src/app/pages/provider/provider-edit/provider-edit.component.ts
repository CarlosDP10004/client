import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/http/error.service';
import { ProviderService } from 'src/app/core/http/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.scss']
})
export class ProviderEditComponent implements OnInit {
  editProvider: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  id: number;
  providerData: any;

  options = [{id:1, name: 'DUI'},{id:2, name:'NIT'}];
  selected: number;

  constructor(
    private builder: FormBuilder, 
    private providerService: ProviderService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { 
    this.editProvider = this.builder.group({
      Seleccion: new FormControl(null, []),
      DocumentoProveedor: new FormControl(null, []),
      NombreProveedor: new FormControl(null, [])
    });

    this.providerService.IdProveedor.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.providerService.getProvider(this.id).subscribe(data => {
          this.providerData = data;
          this.selected = this.providerData.DocumentoProveedor.length > 9 ? 2 : 1;
          if (this.editProvider!=null && this.providerData!=null) {
            this.editProvider.controls['DocumentoProveedor'].setValue(this.providerData.DocumentoProveedor);
            this.editProvider.controls['NombreProveedor'].setValue(this.providerData.NombreProveedor);
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

  guardarProveedor(){
    let providerData = {
      'DocumentoProveedor': this.editProvider.get('DocumentoProveedor').value,
      'NombreProveedor': this.editProvider.get('NombreProveedor').value,
    };
    this.providerService.editProvider(this.id, providerData).subscribe(data => {       
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
