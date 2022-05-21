import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsEditComponent } from '../settings-edit/settings-edit.component';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  settings: any[] = [];
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService
  ) { }

  showAll(){

  }

  ngOnInit(): void {
  }

  editSetting(){
    //this.rolService.changeRolId(IdRol);
    this.bsModalRef = this.bsModalService.show(SettingsEditComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        setTimeout(() => {
          this.showAll();
        }, 5000);
      }
    });
  }

}
