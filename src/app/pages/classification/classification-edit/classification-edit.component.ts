import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classification-edit',
  templateUrl: './classification-edit.component.html',
  styleUrls: ['./classification-edit.component.scss']
})
export class ClassificationEditComponent implements OnInit {
  editClasification: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  accounts: any[] = [];
  id: number;
  clasificationData: any;

  constructor(
    private builder: FormBuilder, 
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private accountService: AccountService,
    private clasificationService: ClasificationService
  ) { 
    this.editClasification = this.builder.group({
      IdCuenta: new FormControl(null, []),
      Descripcion: new FormControl('', [])
    });
    this.accountService.showAll().subscribe(data => {
      Object.assign(this.accounts, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.clasificationService.IdClasificacion.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.clasificationService.getClasificacion(this.id).subscribe(data => {
          this.clasificationData = data;
          
          if (this.editClasification!=null && this.clasificationData!=null) {
            this.editClasification.controls['Descripcion'].setValue(this.clasificationData.Descripcion);
            this.editClasification.controls['IdCuenta'].setValue(this.clasificationData.IdCuenta);
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

  guardarClasificacion(){
    let clasificationData = {
      'Descripcion': this.editClasification.get('Descripcion').value,
      'IdCuenta': this.editClasification.get('IdCuenta').value,
    };
    this.clasificationService.editClasificacion(this.id, clasificationData).subscribe(data => {       
      if(data!=null){
        this.event.emit('OK');
        this.toastr.success(data.toString());
        this.bsModalRef.hide();
      }
    }, (error)=>{
      this.toastr.error(error.error.message.toString());
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

}
