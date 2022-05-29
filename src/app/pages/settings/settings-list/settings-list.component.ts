import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/core/http/settings.service';
import { SettingsEditComponent } from '../settings-edit/settings-edit.component';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  settings: any[] = [];

  constructor(
    private settingService: SettingsService,
    private router: Router
  ) { 
    this.showAll();
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

}
