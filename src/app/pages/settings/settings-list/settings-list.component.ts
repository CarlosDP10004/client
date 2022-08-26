import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/http/auth.service';
import { SettingsService } from 'src/app/core/http/settings.service';
import { PermissionModel } from 'src/app/models/permission';
import { SettingsEditComponent } from '../settings-edit/settings-edit.component';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  settings: any[] = [];

  global: any[] = [];
  permissions: any[] = [];

  constructor(
    private settingService: SettingsService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.showAll();
    this.getPermissions();
  }

  showAll(){
    this.settingService.showAll().subscribe(data => {
      Object.assign(this.settings, data);
    }, error => {
      console.log("Error al obtener los registros ", error);
    });
  }

  ngOnInit(): void {
  }

  editSetting(IdSetting:number){
    this.router.navigate(['/Assets/Settings/Edit/', IdSetting]);
  }

  getPermissions(){
    let aux = new PermissionModel();
    this.authService.getPermission().subscribe(async data => {
      Object.assign(this.global, data);
      this.permissions = aux.validatePermission(this.global, 'Configuraciones');
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


get editar() { return this.validate('Editar'); }

}
