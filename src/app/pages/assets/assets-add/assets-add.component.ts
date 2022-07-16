import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { AssetModel } from 'src/app/models/asset';
import { CalculationService } from 'src/app/core/http/calculation.service';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

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
  selected: any;
  origen:string = '';

  files: any = [];
  idFile: number;
  images: any = [];
  idImage: number;
  event: EventEmitter<any>=new EventEmitter();
  value:any = {};
  seleccion: any;  
  _isTangible: boolean = false;
  _isDepreciable: boolean = true;

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
    private calculateService: CalculationService,
    private attachmentService: AttachmentService
  ) { }

  updateSource(event: Event) {
      this.projectImage(event.target['files'][0]);
      const capturedFile = event.target['files'][0];
      this.images.push(capturedFile);
  }  

  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
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
      IdCuenta:[null,[Validators.required]],
      IdClasificacion:[null,[Validators.required]],
      IdMarca:[null,[Validators.required]],
      Modelo:['',[Validators.required]],
      Descripcion:['',[Validators.required]],
      IdOrigen:[null,[Validators.required]],
      ValorCompra:['',[Validators.required]],
      FechaCompra:['',[Validators.required]],
      VidaUtil:['',[Validators.required]],
      Amortizacion:['',[Validators.required]],
      Depreciacion:['',[Validators.required]],
      ValorActual:['',[Validators.required]],
      DocumentoCompra:['',[Validators.required]],
      Serie:['',[Validators.required]],
      IdProveedor:[null,[Validators.required]],
      LibreGestion:['',[Validators.required]],
      Fotografia:['',[Validators.required]],
      Autor:['',[]],
      Titulo:['',[]],
      Editorial:['',[]],
      Tomo:['',[]],
      Edicion:['',[]],
      Placa:['', []],
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
    let aux = new AssetModel(); 
    let archivo = await this.uploadFile(1);
    let fotografia = await this.uploadImage(2);

    let postData = await aux.getAsset(this.addAsset, fotografia['IdFotografia'], archivo['IdArchivo']);
    this.assetService.addAsset(postData).subscribe(data=>{
      if(data!=null){
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: data.toString(),
            confirmButtonColor: '#c9a892',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigate(['/Assets/Supplies']);
        }
      }, (error)=>{
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
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

  chargeClasification(){
    this.selected = '';
    let IdCuenta = this.addAsset.get('IdCuenta').value;
    this.accountService.getAccount(IdCuenta).subscribe(data => {
      let accountData: any = data;
      if(!accountData.EsDepreciable){
        this.addAsset.controls['VidaUtil'].clearValidators();
        this.addAsset.controls['VidaUtil'].updateValueAndValidity();
      }
      this.selected = accountData.Codigo;
      this._isDepreciable = accountData.EsDepreciable;
    });    
    this.setValidations(this.selected);
    this._isTangible = this.isTangible(IdCuenta);
    this.clasifications = [];
    this.clasificationService.getClasificacionByAccount(IdCuenta).subscribe(data => {
      Object.assign(this.clasifications, data);
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

  public refreshValue(value:any):void {
    this.value = value;
  }

  isTangible(id:any): boolean{
    let aux = false;
    this.accounts.forEach(element => {
      if(element.IdCuenta == id){
        aux = element.EsTangible;        
      }
    });
    return aux
  }

  calculateValues(){
    let values = {
      'VidaUtil': this.addAsset.get('VidaUtil').value,
      'FechaCompra': this.addAsset.get('FechaCompra').value,
      'ValorCompra': this.addAsset.get('ValorCompra').value,
    }  
    this.addAsset.controls['Depreciacion'].setValue(this.calculateService.calculateDepreciation(this._isTangible, values));
    this.addAsset.controls['Amortizacion'].setValue(this.calculateService.calculateAmortization(this._isTangible, values));
    this.addAsset.controls['ValorActual'].setValue(this.calculateService.calculateCurrentValue(this._isTangible, values));
  }

  setValidations(value){
    switch(value){
      case '22615003':
        this.addAsset.get('Autor').setValidators(this.dinamicValidator);
        this.addAsset.get('Titulo').setValidators(this.dinamicValidator);
        this.addAsset.get('Editorial').setValidators(this.dinamicValidator);
        this.addAsset.get('Tomo').setValidators(this.dinamicValidator);
        this.addAsset.get('Edicion').setValidators(this.dinamicValidator);
        this.addAsset.controls['Placa'].clearValidators();
        this.addAsset.controls['Placa'].updateValueAndValidity();
        this.addAsset.controls['Color'].clearValidators();
        this.addAsset.controls['Color'].updateValueAndValidity();
        this.addAsset.controls['NoMotor'].clearValidators();
        this.addAsset.controls['NoMotor'].updateValueAndValidity();
        this.addAsset.controls['NoVIN'].clearValidators();
        this.addAsset.controls['NoVIN'].updateValueAndValidity();
        this.addAsset.controls['NoChasis'].clearValidators();
        this.addAsset.controls['NoChasis'].updateValueAndValidity();
        this.addAsset.controls['NoAsientos'].clearValidators();
        this.addAsset.controls['NoAsientos'].updateValueAndValidity();
        this.addAsset.controls['Anno'].clearValidators();
        this.addAsset.controls['Anno'].updateValueAndValidity();
        break;
      case '24117001':
        this.addAsset.get('Placa').setValidators(this.dinamicValidator);
        this.addAsset.get('Color').setValidators(this.dinamicValidator);
        this.addAsset.get('NoMotor').setValidators(this.dinamicValidator);
        this.addAsset.get('NoVIN').setValidators(this.dinamicValidator);
        this.addAsset.get('NoChasis').setValidators(this.dinamicValidator);
        this.addAsset.get('NoAsientos').setValidators(this.dinamicValidator);
        this.addAsset.get('Anno').setValidators(this.dinamicValidator);
        this.addAsset.controls['Autor'].clearValidators();
        this.addAsset.controls['Autor'].updateValueAndValidity();
        this.addAsset.controls['Titulo'].clearValidators();
        this.addAsset.controls['Titulo'].updateValueAndValidity();
        this.addAsset.controls['Editorial'].clearValidators();
        this.addAsset.controls['Editorial'].updateValueAndValidity();
        this.addAsset.controls['Tomo'].clearValidators();
        this.addAsset.controls['Tomo'].updateValueAndValidity();
        this.addAsset.controls['Edicion'].clearValidators();
        this.addAsset.controls['Edicion'].updateValueAndValidity();
        break;
      default:
        this.addAsset.controls['Autor'].clearValidators();
        this.addAsset.controls['Autor'].updateValueAndValidity();
        this.addAsset.controls['Titulo'].clearValidators();
        this.addAsset.controls['Titulo'].updateValueAndValidity();
        this.addAsset.controls['Editorial'].clearValidators();
        this.addAsset.controls['Editorial'].updateValueAndValidity();
        this.addAsset.controls['Tomo'].clearValidators();
        this.addAsset.controls['Tomo'].updateValueAndValidity();
        this.addAsset.controls['Edicion'].clearValidators();
        this.addAsset.controls['Edicion'].updateValueAndValidity();
        this.addAsset.controls['Placa'].clearValidators();
        this.addAsset.controls['Placa'].updateValueAndValidity();
        this.addAsset.controls['Color'].clearValidators();
        this.addAsset.controls['Color'].updateValueAndValidity();
        this.addAsset.controls['NoMotor'].clearValidators();
        this.addAsset.controls['NoMotor'].updateValueAndValidity();
        this.addAsset.controls['NoVIN'].clearValidators();
        this.addAsset.controls['NoVIN'].updateValueAndValidity();
        this.addAsset.controls['NoChasis'].clearValidators();
        this.addAsset.controls['NoChasis'].updateValueAndValidity();
        this.addAsset.controls['NoAsientos'].clearValidators();
        this.addAsset.controls['NoAsientos'].updateValueAndValidity();
        this.addAsset.controls['Anno'].clearValidators();
        this.addAsset.controls['Anno'].updateValueAndValidity();
        break;
    }
    return;
  }

  dinamicValidator(field) {
    let valid = (field.value != null && field.value != "") ? true : false;    
    if(valid){
      return null;
    }
    return {"invalid":true};
  }

  get IdCuenta():AbstractControl{return this.addAsset.get('IdCuenta');}
  get IdMarca():AbstractControl{return this.addAsset.get('IdMarca');}
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
  get Placa():AbstractControl{return this.addAsset.get('Placa');}
  get Color():AbstractControl{return this.addAsset.get('Color');}
  get NoMotor():AbstractControl{return this.addAsset.get('NoMotor');}
  get NoVIN():AbstractControl{return this.addAsset.get('NoVIN');}
  get NoChasis():AbstractControl{return this.addAsset.get('NoChasis');}
  get NoAsientos():AbstractControl{return this.addAsset.get('NoAsientos');}
  get Anno():AbstractControl{return this.addAsset.get('Anno');}
  get Autor():AbstractControl{return this.addAsset.get('Autor');}
  get Titulo():AbstractControl{return this.addAsset.get('Titulo');}
  get Editorial():AbstractControl{return this.addAsset.get('Editorial');}
  get Tomo():AbstractControl{return this.addAsset.get('Tomo');}
  get Edicion():AbstractControl{return this.addAsset.get('Edicion');}

  public placa = { '0': { pattern: new RegExp('\[A-Z0-9\]')} };
  
}
