import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { SettingsService } from 'src/app/core/http/settings.service';
import { SettingModel } from 'src/app/models/setting';




@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.scss']
})
export class SettingsEditComponent implements OnInit {
  editSetting: FormGroup;

  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();
  
  seleccion: any;
  event: EventEmitter<any>=new EventEmitter();
  id: number;
  settingData: any;

  tipo: string;
  files: any = [];
  origen:string = '';
  flagImage: number = 0;

  Texto: string;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private settingService: SettingsService,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private router: Router,
    private attachmentService: AttachmentService,
  ) {
  }

  ngOnInit(): void {
    this.init()
  }

  init(){
    let IdSetting = this.route.snapshot.paramMap.get("id");
    this.editSetting = this.builder.group({
      Tipo: new FormControl('', []),
      Nombre: new FormControl('', []),
      Descripcion: new FormControl('', []),
      ValorEntero: new FormControl('', []),
      ValorImagen: new FormControl('', []),
      ValorCadena: new FormControl('<p>Some html</p>'),
      ValorDecimal: new FormControl('', []),
    });

    this.settingService.getSetting(IdSetting).subscribe(data => {
      this.settingData = data;
      if(this.editSetting!=null && this.settingData!=null){
        this.tipo = this.settingData.Tipo;
        this.editSetting.controls['Tipo'].setValue(this.settingData.Tipo);
        this.editSetting.controls['Nombre'].setValue(this.settingData.Nombre);
        this.editSetting.controls['Descripcion'].setValue(this.settingData.Descripcion);
        if(this.settingData.Tipo == 'Entero'){
          this.editSetting.controls['ValorEntero'].setValue(this.settingData.ValorEntero);
        }
        if(this.settingData.Tipo == 'Imagen'){
          //this.editSetting.controls['ValorImagen'].setValue(this.settingData.ValorImagen);
        }
        if(this.settingData.Tipo == 'Texto'){
          this.editSetting.controls['ValorCadena'].setValue(this.settingData.ValorCadena);
          this.Texto = this.settingData.ValorCadena;
        }
        if(this.settingData.Tipo == 'Punto flotante'){
          this.editSetting.controls['ValorDecimal'].setValue(this.settingData.ValorDecimal);
        }
      }
    });
  }

  async guardarConfiguracion(){
    let IdSetting = this.route.snapshot.paramMap.get("id"); 
    let aux = new SettingModel(); 
    let fotografia: any = this.thereIsChange(this.flagImage) ? await this.uploadImage(2) : 0;
    let postData = aux.getSetting(this.editSetting, fotografia['IdFotografia']);
    this.settingService.editSetting(IdSetting, postData).subscribe(data => {       
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Settings']);
      }
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });

  }

  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
    this.flagImage = 1;
  } 
  

  uploadImage(tipo): any{ 
    return new Promise((resolved, reject) => {
      const fileData = new FormData();    
      this.files.forEach(file =>{
        fileData.append('Adjunto', file)
      });
      fileData.append('Tipo', tipo)
      this.attachmentService.uploadFiles(fileData).subscribe(data=>{
      resolved(data);});
    });  
  }

  thereIsChange(flag: number){
    if(flag == 1){
      return true;
    }
    return false;
  }


 
}
