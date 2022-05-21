import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/http/error.service';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.scss']
})
export class SettingsEditComponent implements OnInit {
  editConfiguracion: FormGroup;
  seleccion: any;
  event: EventEmitter<any>=new EventEmitter();
  id: number;
  settingData: any;

  constructor(
    private builder: FormBuilder, 
    private bsModalRef: BsModalRef,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
  }

  editarConfiguracion(){

  }

  onClose(){
    this.bsModalRef.hide();
  }

}
