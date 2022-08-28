import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/http/error.service';
import { ProviderService } from 'src/app/core/http/provider.service';

@Component({
  selector: 'app-provider-add',
  templateUrl: './provider-add.component.html',
  styleUrls: ['./provider-add.component.scss']
})
export class ProviderAddComponent implements OnInit {
  addProvider: FormGroup;
  event: EventEmitter<any>=new EventEmitter();

  options = [{id:1, name: 'DUI'},{id:2, name:'NIT'}];
  selected: number;

  constructor(
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private providerService: ProviderService,
    private errorService: ErrorService
  ) { 
    this.addProvider = this.builder.group({
      Seleccion: new FormControl(null, []),
      DocumentoProveedor: new FormControl(null, []),
      NombreProveedor: new FormControl('', [])
    });
  }

  ngOnInit(): void {
  }

  guardarProveedor(){
    let postData = {
      'DocumentoProveedor': this.addProvider.get('DocumentoProveedor').value,
      'NombreProveedor': this.addProvider.get('NombreProveedor').value
    };
    this.providerService.addProvider(postData).subscribe(data=>{
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

  get Seleccion():any{return this.addProvider.get('Seleccion');}

}
