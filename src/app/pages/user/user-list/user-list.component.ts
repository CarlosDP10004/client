import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/core/http/user.service';
import { UseraddComponent } from '../useradd/useradd.component';
import { UsereditComponent } from '../useredit/useredit.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users: any[] = [];
  bsModalRef: BsModalRef;
  constructor(
    private userService: UserService,
    private bsModalService: BsModalService
  ) { 
    this.showAll();
  }


  showAll(){
    this.userService.showAll().subscribe(data => {
      Object.assign(this.users, data);
    }, error => {
      console.log("Error al obtener los registros ", error);
    });
    /*this.userService.showAll().subscribe(data =>{      
      console.log(data);
      this.users= data;
    });*/
  }


  addUser() {
    this.bsModalRef = this.bsModalService.show(UseraddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
    
  }


  editUser(IdUsuario:number){
    this.userService.changeUsuarioId(IdUsuario);
    this.bsModalRef = this.bsModalService.show(UsereditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.showAll();
        }, 5000);
      }
    });
  }

}
