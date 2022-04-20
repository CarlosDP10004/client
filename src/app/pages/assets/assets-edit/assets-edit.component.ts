import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { BrandService } from 'src/app/core/http/brand.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ProviderService } from 'src/app/core/http/provider.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assets-edit',
  templateUrl: './assets-edit.component.html',
  styleUrls: ['./assets-edit.component.scss']
})
export class AssetsEditComponent implements OnInit {

  @Output() onChange: EventEmitter<File> = new EventEmitter<File>();

  editAsset:FormGroup;
  assetData: any;
  accounts: any[] = [];
  providers: any[] = [];
  origens: any[] = [];
  status: any[] = [];
  brands: any[] = [];
  clasifications: any[] = [];
  selected: number;
  origen:string = '';

  image: any;
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
    private attachmentService: AttachmentService,
    private route: ActivatedRoute,
    public datepipe: DatePipe
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
    let IdAsset = this.route.snapshot.paramMap.get("id");
    this.editAsset = this.formBuilder.group({
      CodigoAF:['',[Validators.required]],
      IdEstado:['',[Validators.required]],
      FechaRegistro:['',[Validators.required]],
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

    this.assetService.getEstados().subscribe(data => {
      Object.assign(this.status, data);
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

    this.assetService.getAsset(IdAsset).subscribe(data => {
      this.assetData = data;
      this.chargeClasification(this.assetData.IdCuenta);
      
      if(this.editAsset!=null && this.assetData!=null){
        this.editAsset.controls['CodigoAF'].setValue(this.assetData.CodigoAF);
        this.editAsset.controls['IdEstado'].setValue(this.assetData.IdEstado);
        this.editAsset.controls['FechaRegistro'].setValue(this.datepipe.transform(this.assetData.FechaRegistro, 'yyyy-MM-dd'));
        this.editAsset.controls['IdCuenta'].setValue(this.assetData.IdCuenta);        
        this.editAsset.controls['IdClasificacion'].setValue(this.assetData.IdClasificacion);
        this.editAsset.controls['IdOrigen'].setValue(this.assetData.IdOrigen);
        this.editAsset.controls['IdMarca'].setValue(this.assetData.IdMarca);
        this.editAsset.controls['Modelo'].setValue(this.assetData.Modelo);
        this.editAsset.controls['Serie'].setValue(this.assetData.Serie);
        this.editAsset.controls['IdProveedor'].setValue(this.assetData.IdProveedor);
        this.editAsset.controls['ValorCompra'].setValue(this.assetData.ValorCompra);
        this.editAsset.controls['FechaCompra'].setValue(this.datepipe.transform(this.assetData.FechaCompra, 'yyyy-MM-dd'));
        this.editAsset.controls['Descripcion'].setValue(this.assetData.Descripcion);
        this.editAsset.controls['LibreGestion'].setValue(this.assetData.LibreGestion);
        //this.editAsset.controls['DocumentoCompra'].setValue(this.assetData.archivo.Ubicacion);
        this.origen = this.attachmentService.getPathImage(this.assetData.fotografia.Ubicacion);
      }
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      })  
    });
  }

  async guardarActivo(){   
    let postData = await this.getObject();   
    let IdAsset = this.route.snapshot.paramMap.get("id"); 
    this.assetService.editAsset(IdAsset, postData).subscribe(data => {       
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Supplies']);
      }
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }


  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
  }

  getObject(){
    let asset;
    switch (parseInt(this.editAsset.get('IdCuenta').value)) {
      case 2:
        asset = {
          'IdEstado':this.editAsset.get('IdEstado').value,
          'IdCuenta': this.editAsset.get('IdCuenta').value,
          'IdClasificacion': this.editAsset.get('IdClasificacion').value,
          'IdMarca': this.editAsset.get('IdMarca').value,
          'Modelo': this.editAsset.get('Modelo').value,
          'Descripcion': this.editAsset.get('Descripcion').value,
          'IdOrigen': this.editAsset.get('IdOrigen').value,
          'ValorCompra': this.editAsset.get('ValorCompra').value,
          'FechaCompra': this.editAsset.get('FechaCompra').value,
          'IdArchivo': 1,
          'Serie': this.editAsset.get('Serie').value,
          'IdProveedor': this.editAsset.get('IdProveedor').value,
          'LibreGestion': this.editAsset.get('LibreGestion').value,
          'IdFotografia': 1,          
          'Placa': null,
          'Color': null,
          'NoMotor': null,
          'NoVIN': null,
          'NoChasis': null,
          'NoAsientos': null,
          'Anno': null,
          'Autor': this.editAsset.get('Autor').value,
          'Titulo': this.editAsset.get('Titulo').value,
          'Editorial': this.editAsset.get('Editorial').value,
          'Tomo': this.editAsset.get('Tomo').value,
          'Edicion': this.editAsset.get('Edicion').value,
        }
        break;
      case 4:
        asset = {
          'IdEstado':this.editAsset.get('IdEstado').value,
          'IdCuenta': this.editAsset.get('IdCuenta').value,
          'IdClasificacion': this.editAsset.get('IdClasificacion').value,
          'IdMarca': this.editAsset.get('IdMarca').value,
          'Modelo': this.editAsset.get('Modelo').value,
          'Descripcion': this.editAsset.get('Descripcion').value,
          'IdOrigen': this.editAsset.get('IdOrigen').value,
          'ValorCompra': this.editAsset.get('ValorCompra').value,
          'FechaCompra': this.editAsset.get('FechaCompra').value,
          'IdArchivo': 1,
          'Serie': this.editAsset.get('Serie').value,
          'IdProveedor': this.editAsset.get('IdProveedor').value,
          'LibreGestion': this.editAsset.get('LibreGestion').value,
          'IdFotografia': 1,    
          'Placa': this.editAsset.get('Placa').value,
          'Color': this.editAsset.get('Color').value,
          'NoMotor': this.editAsset.get('NoMotor').value,
          'NoVIN': this.editAsset.get('NoVIN').value,
          'NoChasis': this.editAsset.get('NoChasis').value,
          'NoAsientos': this.editAsset.get('NoAsientos').value,
          'Anno': this.editAsset.get('Anno').value,    
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
          'IdEstado':this.editAsset.get('IdEstado').value,
          'IdCuenta': this.editAsset.get('IdCuenta').value,
          'IdClasificacion': this.editAsset.get('IdClasificacion').value,
          'IdMarca': this.editAsset.get('IdMarca').value,
          'Modelo': this.editAsset.get('Modelo').value,
          'Descripcion': this.editAsset.get('Descripcion').value,
          'IdOrigen': this.editAsset.get('IdOrigen').value,
          'ValorCompra': this.editAsset.get('ValorCompra').value,
          'FechaCompra': this.editAsset.get('FechaCompra').value,
          'IdArchivo': 1,
          'Serie': this.editAsset.get('Serie').value,
          'IdProveedor': this.editAsset.get('IdProveedor').value,
          'LibreGestion': this.editAsset.get('LibreGestion').value,
          'IdFotografia': 1,    
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
      return new Promise((resolved, reject) => {
        this.clasificationService.getClasificacionByAccount(value).subscribe(data => {
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
      });
    
  }

  get CodigoAF():AbstractControl{return this.editAsset.get('CodigoAF');}
  get FechaRegistro():AbstractControl{return this.editAsset.get('FechaRegistro');}
  get IdEstado():AbstractControl{return this.editAsset.get('IdEstado');}
  get IdCuenta():AbstractControl{return this.editAsset.get('IdCuenta');}
  get Marca():AbstractControl{return this.editAsset.get('Marca');}
  get Modelo():AbstractControl{return this.editAsset.get('Modelo');}
  get Descripcion():AbstractControl{return this.editAsset.get('Descripcion');}
  get IdOrigen():AbstractControl{return this.editAsset.get('IdOrigen');}
  get IdClasificacion():AbstractControl{return this.editAsset.get('IdClasificacion');}
  get ValorCompra():AbstractControl{return this.editAsset.get('ValorCompra');}
  get FechaCompra():AbstractControl{return this.editAsset.get('FechaCompra');}
  get DocumentoCompra():AbstractControl{return this.editAsset.get('DocumentoCompra');}
  get Serie():AbstractControl{return this.editAsset.get('Serie');}
  get IdProveedor():AbstractControl{return this.editAsset.get('IdProveedor');}
  get Fotografia():AbstractControl{return this.editAsset.get('Fotografia');}
  get LibreGestion():AbstractControl{return this.editAsset.get('LibreGestion');}

}
