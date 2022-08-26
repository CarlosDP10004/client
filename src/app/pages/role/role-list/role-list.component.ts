import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/core/http/auth.service';
import { RolesService } from 'src/app/core/http/roles.service';
import { PermissionModel } from 'src/app/models/permission';
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

  global: any[] = [];
  permissions: any[] = [];

  constructor(
    private rolService: RolesService,
    private authService: AuthService,
    private bsModalService: BsModalService
  ) {
    this.showAll();
    this.getPermissions();
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

  getPermissions(){
    let aux = new PermissionModel();
    this.authService.getPermission().subscribe(async data => {
      Object.assign(this.global, data);
      this.permissions = aux.validatePermission(this.global, 'Roles');
    }, error =>{
      console.log(error);
    });
}


validate(permission: string){
    let authorized = false;
    this.permissions.forEach(x => {       
      if(x.name.includes(permission)){
        authorized = true;
      }
    });
    return authorized;
}


get agregar() { return this.validate('Agregar'); }
get editar() { return this.validate('Editar'); }

}
