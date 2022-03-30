import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesService } from 'src/app/core/http/roles.service';
import { RoleAddComponent } from '../role-add/role-add.component';
import { RoleEditComponent } from '../role-edit/role-edit.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {

  roles: any[] = [];
  bsModalRef: BsModalRef;
  constructor(
    private rolService: RolesService,
    private bsModalService: BsModalService
  ) {
    this.showAll();
   }



  showAll(){
    this.rolService.showAll().subscribe(data => {
      Object.assign(this.roles, data);
    }, error => {
      console.log("Error al obtener los registros ", error);
    });
  }

  addRole(){
    this.bsModalRef = this.bsModalService.show(RoleAddComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.showAll();
      }
    });
  }

  editRole(IdRol:number){
    this.rolService.changeRolId(IdRol);
    this.bsModalRef = this.bsModalService.show(RoleEditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.showAll();
        }, 5000);
      }
    });
  }

}
