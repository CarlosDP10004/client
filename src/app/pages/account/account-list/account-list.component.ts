import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import Swal from 'sweetalert2';
import { AccountEditComponent } from '../account-edit/account-edit.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent {
  page: number = 1;
  accounts: any[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private accountService: AccountService,
    private bsModalService: BsModalService,
    private toastr: ToastrService
  ) { 
    this.showAll();
  }

  showAll(){
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
  }

  editAccount(IdCuenta:number){
    this.accountService.changeAccountId(IdCuenta);
    this.bsModalRef = this.bsModalService.show(AccountEditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.showAll();
        }, 5000);
      }
    });
  }

  changeStatus(){}

}
