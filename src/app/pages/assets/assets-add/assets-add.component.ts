import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { BrandService } from 'src/app/core/http/brand.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ProviderService } from 'src/app/core/http/provider.service';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-assets-add',
  templateUrl: './assets-add.component.html',
  styleUrls: ['./assets-add.component.scss']
})
export class AssetsAddComponent implements OnInit {
  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();
  addAsset:FormGroup;
  accounts: any[] = [];
  providers: any[] = [];
  origens: any[] = [];
  brands: any[] = [];
  clasifications: any[] = [];
  selected: number;
  origen:string = '';

  files: any = [];
  idFile: number;
  images: any = [];
  idImage: number;
  event: EventEmitter<any>=new EventEmitter();

  constructor(
    private formBuilder:FormBuilder,     
    private toastr: ToastrService,
    private router:Router,
    private assetService: AssetsService,
    private brandService: BrandService,
    private accountService: AccountService,
    private providerService: ProviderService,
    private clasificationService: ClasificationService,
    private errorService: ErrorService,
    private attachmentService: AttachmentService
  ) { }

  updateSource(event: Event) {
      this.projectImage(event.target['files'][0]);
      const capturedFile = event.target['files'][0];
      this.images.push(capturedFile);
  }  
  
  projectImage(file: File) {
      let reader = new FileReader;      
      reader.onload = (e: any) => {          
          this.origen = e.target.result;
          this.onChange.emit(file);
      };      
      reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.addAsset = this.formBuilder.group({
      IdCuenta:['',[Validators.required]],
      IdClasificacion:['',[Validators.required]],
      IdMarca:['',[Validators.required]],
      Modelo:['',[Validators.required]],
      Descripcion:['',[Validators.required]],
      IdOrigen:['',[Validators.required]],
      ValorCompra:['',[Validators.required]],
      FechaCompra:['',[Validators.required]],
      DocumentoCompra:['',[Validators.required]],
      Serie:['',[Validators.required]],
      IdProveedor:['',[Validators.required]],
      LibreGestion:['',[Validators.required]],
      Fotografia:['',[Validators.required]],
      Autor:['',[]],
      Titulo:['',[]],
      Editorial:['',[]],
      Tomo:['',[]],
      Edicion:['',[]],
      Placa:['',[]],
      Color:['',[]],
      NoMotor:['',[]],
      NoVIN:['',[]],
      NoChasis:['',[]],
      NoAsientos:['',[]],
      Anno:['',[]],
    });

    this.accountService.getAccountList().subscribe(data => {
      Object.assign(this.accounts, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.assetService.getOrigen().subscribe(data => {
      Object.assign(this.origens, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.brandService.getBrandList().subscribe(data => {
      Object.assign(this.brands, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.providerService.getProviderList().subscribe(data => {
      Object.assign(this.providers, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });
  }

  async guardarActivo(){  
    if(this.addAsset.invalid){
      return Object.values(this.addAsset.controls).forEach(control=>{
        control.markAllAsTouched();
      })
    } 
    let archivo = await this.uploadFile(1);
    let fotografia = await this.uploadImage(2);
    let postData = await this.getObject(archivo['IdArchivo'], fotografia['IdFotografia']);    
    switch (parseInt(this.addAsset.get('IdCuenta').value)) {
      case 2:
        this.assetService.addPatent(postData).subscribe(data=>{
          if(data!=null){
              this.toastr.success(data.toString());
              this.router.navigate(['/Assets/Supplies']);
            }
          }, (error)=>{
          this.toastr.error(this.errorService.getErrorMessage(error.error));
        }); 
        break;
      case 4:
        this.assetService.addVehicle(postData).subscribe(data=>{
          if(data!=null){
              this.toastr.success(data.toString());
              this.router.navigate(['/Assets/Supplies']);
            }
          }, (error)=>{
          this.toastr.error(this.errorService.getErrorMessage(error.error));
        }); 
        break;
      case 1:
      case 3:
      case 5:
      case 6:
        this.assetService.addAsset(postData).subscribe(data=>{
          if(data!=null){
              this.toastr.success(data.toString());
              this.router.navigate(['/Assets/Supplies']);
            }
          }, (error)=>{
          this.toastr.error(this.errorService.getErrorMessage(error.error));
        }); 
        break;
      default:
        console.log(postData);
    }    
  } 

  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
  }

  getObject(file, photo){
    let asset;
    switch (parseInt(this.addAsset.get('IdCuenta').value)) {
      case 2:
        asset = {
          'IdCuenta': this.addAsset.get('IdCuenta').value,
          'IdClasificacion': this.addAsset.get('IdClasificacion').value,
          'IdMarca': this.addAsset.get('IdMarca').value,
          'Modelo': this.addAsset.get('Modelo').value,
          'Descripcion': this.addAsset.get('Descripcion').value,
          'IdOrigen': this.addAsset.get('IdOrigen').value,
          'ValorCompra': this.addAsset.get('ValorCompra').value,
          'FechaCompra': this.addAsset.get('FechaCompra').value,
          'IdArchivo': file,
          'Serie': this.addAsset.get('Serie').value,
          'IdProveedor': this.addAsset.get('IdProveedor').value,
          'LibreGestion': this.addAsset.get('LibreGestion').value,
          'IdFotografia': photo,
          'Placa': null,
          'Color': null,
          'NoMotor': null,
          'NoVIN': null,
          'NoChasis': null,
          'NoAsientos': null,
          'Anno': null,
          'Autor': this.addAsset.get('Autor').value,
          'Titulo': this.addAsset.get('Titulo').value,
          'Editorial': this.addAsset.get('Editorial').value,
          'Tomo': this.addAsset.get('Tomo').value,
          'Edicion': this.addAsset.get('Edicion').value,
        }
        break;
      case 4:
        asset = {
          'IdCuenta': this.addAsset.get('IdCuenta').value,
          'IdClasificacion': this.addAsset.get('IdClasificacion').value,
          'IdMarca': this.addAsset.get('IdMarca').value,
          'Modelo': this.addAsset.get('Modelo').value,
          'Descripcion': this.addAsset.get('Descripcion').value,
          'IdOrigen': this.addAsset.get('IdOrigen').value,
          'ValorCompra': this.addAsset.get('ValorCompra').value,
          'FechaCompra': this.addAsset.get('FechaCompra').value,
          'IdArchivo': file,
          'Serie': this.addAsset.get('Serie').value,
          'IdProveedor': this.addAsset.get('IdProveedor').value,
          'LibreGestion': this.addAsset.get('LibreGestion').value,
          'IdFotografia': photo,    
          'Placa': this.addAsset.get('Placa').value,
          'Color': this.addAsset.get('Color').value,
          'NoMotor': this.addAsset.get('NoMotor').value,
          'NoVIN': this.addAsset.get('NoVIN').value,
          'NoChasis': this.addAsset.get('NoChasis').value,
          'NoAsientos': this.addAsset.get('NoAsientos').value,
          'Anno': this.addAsset.get('Anno').value,    
          'Autor': null,
          'Titulo': null,
          'Editorial': null,
          'Tomo': null,
          'Edicion': null,
        }
        console.log(asset);
        break;
      case 1:
      case 3:
      case 5:
      case 6:
        asset = {
          'IdCuenta': this.addAsset.get('IdCuenta').value,
          'IdClasificacion': this.addAsset.get('IdClasificacion').value,
          'IdMarca': this.addAsset.get('IdMarca').value,
          'Modelo': this.addAsset.get('Modelo').value,
          'Descripcion': this.addAsset.get('Descripcion').value,
          'IdOrigen': this.addAsset.get('IdOrigen').value,
          'ValorCompra': this.addAsset.get('ValorCompra').value,
          'FechaCompra': this.addAsset.get('FechaCompra').value,
          'IdArchivo': file,
          'Serie': this.addAsset.get('Serie').value,
          'IdProveedor': this.addAsset.get('IdProveedor').value,
          'LibreGestion': this.addAsset.get('LibreGestion').value,
          'IdFotografia': photo,    
          'Placa': null,
          'Color': null,
          'NoMotor': null,
          'NoVIN': null,
          'NoChasis': null,
          'NoAsientos': null,
          'Anno': null,
          'Autor': null,
          'Titulo': null,
          'Editorial': null,
          'Tomo': null,
          'Edicion': null,
        }
        break;
      default:
        console.log();
    }
    return asset;
  }

  uploadFile(tipo): any{ 
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

  uploadImage(tipo): any{ 
    return new Promise((resolved, reject) => {
      const fileData = new FormData();    
      this.images.forEach(file =>{
        fileData.append('Adjunto', file)
      });
      fileData.append('Tipo', tipo)
      this.attachmentService.uploadFiles(fileData).subscribe(data=>{
      resolved(data);});
    });  
  }

  chargeClasification(value){
    this.clasifications = [];
    this.clasificationService.getClasificacionByAccount(value).subscribe(data => {
      Object.assign(this.clasifications, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        //text: error,
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });
  }

  get IdCuenta():AbstractControl{return this.addAsset.get('IdCuenta');}
  get Marca():AbstractControl{return this.addAsset.get('Marca');}
  get Modelo():AbstractControl{return this.addAsset.get('Modelo');}
  get Descripcion():AbstractControl{return this.addAsset.get('Descripcion');}
  get IdOrigen():AbstractControl{return this.addAsset.get('IdOrigen');}
  get IdClasificacion():AbstractControl{return this.addAsset.get('IdClasificacion');}
  get ValorCompra():AbstractControl{return this.addAsset.get('ValorCompra');}
  get FechaCompra():AbstractControl{return this.addAsset.get('FechaCompra');}
  get DocumentoCompra():AbstractControl{return this.addAsset.get('DocumentoCompra');}
  get Serie():AbstractControl{return this.addAsset.get('Serie');}
  get IdProveedor():AbstractControl{return this.addAsset.get('IdProveedor');}
  get Fotografia():AbstractControl{return this.addAsset.get('Fotografia');}
  get LibreGestion():AbstractControl{return this.addAsset.get('LibreGestion');}
  get FechaRegistro():AbstractControl{return this.addAsset.get('FechaRegistro');}
  
}
