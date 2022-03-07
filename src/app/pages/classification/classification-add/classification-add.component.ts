import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { ErrorService } from 'src/app/core/http/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-classification-add',
  templateUrl: './classification-add.component.html',
  styleUrls: ['./classification-add.component.scss']
})
export class ClassificationAddComponent implements OnInit {
  page: number = 1;
  addClasification: FormGroup;
  accounts: any[] = [];
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private clasificationService: ClasificationService,
    private errorService: ErrorService
  ) { 
    this.addClasification = this.builder.group({      
      Descripcion: new FormControl('', []),
      IdCuenta: new FormControl('', [])
    });
    this.accountService.getAccountList().subscribe(data => {
      Object.assign(this.accounts, data);
    }, error => { 
      this.onClose();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });
  }

  ngOnInit(): void {
  }

  guardarClasificacion(){
    let postData = {
      'Descripcion': this.addClasification.get('Descripcion').value,
      'IdCuenta': this.addClasification.get('IdCuenta').value
    };
    this.clasificationService.addClasificacion(postData).subscribe(data=>{
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
