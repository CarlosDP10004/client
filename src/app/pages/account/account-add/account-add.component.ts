import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { ErrorService } from 'src/app/core/http/error.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {
  addAccount: FormGroup;
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private bsModalRef: BsModalRef,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    private errorService: ErrorService
  ) {
    this.addAccount = this.builder.group({      
      Codigo: new FormControl('', []),
      NombreCuenta: new FormControl('', []),
      EsTangible: new FormControl(false, [])
    });
   }

  ngOnInit(): void {
  }


  guardarCuenta(){
    let postData = {
      'Codigo': this.addAccount.get('Codigo').value,
      'NombreCuenta': this.addAccount.get('NombreCuenta').value,
      'EsTangible': this.addAccount.get('EsTangible').value,
    };
    this.accountService.addAccount(postData).subscribe(data=>{
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
