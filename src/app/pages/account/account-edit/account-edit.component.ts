import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { ErrorService } from 'src/app/core/http/error.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {

  editAccount: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  accounts: any[] = [];
  id: number;
  accountData: any;

  constructor(
    private builder: FormBuilder, 
    private accountService: AccountService,
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) {
    this.editAccount = this.builder.group({
      Codigo: new FormControl(null, []),
      NombreCuenta: new FormControl('', []),
      EsTangible: new FormControl(null, []),
      EsDepreciable: new FormControl(false, []),
    });

    this.accountService.IdCuenta.subscribe(data => {
      this.id = data;
      if (this.id !== undefined) {
        this.accountService.getAccount(this.id).subscribe(data => {
          this.accountData = data;
          
          if (this.editAccount!=null && this.accountData!=null) {
            this.editAccount.controls['Codigo'].setValue(this.accountData.Codigo);
            this.editAccount.controls['NombreCuenta'].setValue(this.accountData.NombreCuenta);
            this.editAccount.controls['EsTangible'].setValue(this.accountData.EsTangible);
            this.editAccount.controls['EsDepreciable'].setValue(this.accountData.EsDepreciable);
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

  guardarCuenta(){
    let accountData = {
      'Codigo': this.editAccount.get('Codigo').value,
      'NombreCuenta': this.editAccount.get('NombreCuenta').value,
      'EsTangible': this.editAccount.get('EsTangible').value,
      'EsDepreciable': this.editAccount.get('EsDepreciable').value,
    };
    this.accountService.editAccount(this.id, accountData).subscribe(data => {       
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
