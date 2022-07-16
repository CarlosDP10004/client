import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { BrandService } from 'src/app/core/http/brand.service';
import { CalculationService } from 'src/app/core/http/calculation.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ProviderService } from 'src/app/core/http/provider.service';
import { AssetModel } from 'src/app/models/asset';
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
  selected: string;
  origen:string = '';
  adjunto:any;

  image: any;
  files: any = [];
  idFile: number;
  images: any = [];
  idImage: number;

  flagImage: number = 0;
  flagFile: number = 0;
  event: EventEmitter<any>=new EventEmitter();

  _isTangible: boolean = false;
  _isDepreciable: boolean = true;

  warning: boolean = false;

  vehicle: boolean = false;
  patente: boolean = false;

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
    private calculateService: CalculationService,
    public datepipe: DatePipe
  ) { }

  updateSource(event: Event) {
    this.projectImage(event.target['files'][0]);
    const capturedFile = event.target['files'][0];
    this.images.push(capturedFile);
    this.flagImage = 1;
  }  

  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
    this.flagFile = 1;
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
      VidaUtil:['',[Validators.required]],
      Amortizacion:['',[Validators.required]],
      Depreciacion:['',[Validators.required]],
      ValorActual:['',[Validators.required]],
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

    this.assetService.getAsset(IdAsset).subscribe(async data => {
      this.assetData = data;
      this.vehicle = await this.assetData.cuenta.Codigo == '24117001' ? true : false;
      this.patente = await this.assetData.cuenta.Codigo == '22615003' ? true : false;

      this._isDepreciable = this.assetData.cuenta.EsDepreciable;
      this._isTangible = this.assetData.cuenta.EsTangible;      
      
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
        this.editAsset.controls['VidaUtil'].setValue(this.assetData.VidaUtil);
        this.editAsset.controls['Descripcion'].setValue(this.assetData.Descripcion);
        this.editAsset.controls['LibreGestion'].setValue(this.assetData.LibreGestion);
        this.origen = this.attachmentService.getPathImage(this.assetData.fotografia.Ubicacion);
        if(this.patente){
          this.editAsset.controls['Autor'].setValue(this.assetData.patente.Autor);
          this.editAsset.controls['Titulo'].setValue(this.assetData.patente.Titulo);
          this.editAsset.controls['Editorial'].setValue(this.assetData.patente.Editorial);
          this.editAsset.controls['Tomo'].setValue(this.assetData.patente.Tomo);
          this.editAsset.controls['Edicion'].setValue(this.assetData.patente.Edicion);
        }
        if(this.vehicle){
          this.editAsset.controls['Placa'].setValue(this.assetData.vehiculo.Placa);
          this.editAsset.controls['Color'].setValue(this.assetData.vehiculo.Color);
          this.editAsset.controls['NoMotor'].setValue(this.assetData.vehiculo.NoMotor);
          this.editAsset.controls['NoVIN'].setValue(this.assetData.vehiculo.NoVIN);
          this.editAsset.controls['NoChasis'].setValue(this.assetData.vehiculo.NoChasis);
          this.editAsset.controls['NoAsientos'].setValue(this.assetData.vehiculo.NoAsientos);
          this.editAsset.controls['Anno'].setValue(this.assetData.vehiculo.Anno);
        }
        if(this.assetData.mantenimiento.length === 0){
          let values = {
            'VidaUtil': this.assetData.VidaUtil,
            'FechaCompra': this.assetData.FechaCompra,
            'ValorCompra': this.assetData.ValorCompra,
          }
          this._calculateValues(values);
        }else{
          let thereIsLast = false;
          this.assetData.mantenimiento.forEach(element => {
            if(element.Ultimo){
              thereIsLast = true;
              this.warning = true;
              let values = {
                'VidaUtil': element.VidaUtil,
                'FechaCompra': element.FechaFin,
                'ValorCompra': element.Revalorizacion,
              } 
              this._calculateValues(values);
            }
          });
          if(!thereIsLast){
            let values = {
              'VidaUtil': this.assetData.VidaUtil,
              'FechaCompra': this.assetData.FechaCompra,
              'ValorCompra': this.assetData.ValorCompra,
            }
            this._calculateValues(values);
          }
        }

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
    let IdAsset = this.route.snapshot.paramMap.get("id"); 
    let aux = new AssetModel();  
    let idNewImage: any = this.thereIsChange(this.flagFile) ? await this.uploadFile(1, IdAsset) : 0;
    let idNewFile: any = this.thereIsChange(this.flagImage) ? await this.uploadImage(2, IdAsset) : 0;
    let postData = await aux.getAsset(this.editAsset, idNewFile, idNewImage);
    
    this.assetService.editAsset(IdAsset, postData).subscribe(data => {       
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Supplies']);
      }
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }


  thereIsChange(flag: number){
    if(flag == 1){
      return true;
    }
    return false;
  }


  uploadFile(tipo, id): any{ 
    return new Promise((resolved, reject) => {
      const fileData = new FormData();    
      this.files.forEach(file =>{
        fileData.append('Adjunto', file)
      });
      fileData.append('Tipo', tipo)
      this.attachmentService.updateAttachment(fileData, id).subscribe(data=>{
      resolved(data['IdArchivo']);});
    }); 
  }

  uploadImage(tipo, id): any{ 
    return new Promise((resolved, reject) => {
      const fileData = new FormData();    
      this.images.forEach(file =>{
        fileData.append('Adjunto', file)
      });
      fileData.append('Tipo', tipo)
      this.attachmentService.updateAttachment(fileData, id).subscribe(data=>{
      resolved(data['IdFotografia']);});
    });  
  }


  downloadPDF(){
    let IdAsset = this.route.snapshot.paramMap.get("id");
    let pdf;
    this.assetService.getAsset(IdAsset).subscribe(data => {       
      pdf = data;
      this.attachmentService.downloadPDF(pdf.archivo.Ubicacion).subscribe(response =>{
      this.manageFile(response, pdf.archivo.Ubicacion);
      this.toastr.success("Archivo descargado con éxito")
      });      
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }
  
  manageFile(response: any, filename: string): void{
    const dataType = response.type;
    const binaryData = [];
    binaryData.push(response);
    const filePath = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
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

  calculateValues(){
    let values = {
      'VidaUtil': this.editAsset.get('VidaUtil').value,
      'FechaCompra': this.editAsset.get('FechaCompra').value,
      'ValorCompra': this.editAsset.get('ValorCompra').value,
    } 
    this.editAsset.controls['Depreciacion'].setValue(this.calculateService.calculateDepreciation(this._isTangible, values));
    this.editAsset.controls['Amortizacion'].setValue(this.calculateService.calculateAmortization(this._isTangible, values));
    this.editAsset.controls['ValorActual'].setValue(this.calculateService.calculateCurrentValue(this._isTangible, values));
  }

  _calculateValues(values: any){
    this.editAsset.controls['Depreciacion'].setValue(this.calculateService.calculateDepreciation(this._isTangible, values));
    this.editAsset.controls['Amortizacion'].setValue(this.calculateService.calculateAmortization(this._isTangible, values));
    this.editAsset.controls['ValorActual'].setValue(this.calculateService.calculateCurrentValue(this._isTangible, values));
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

  public placa = { '0': { pattern: new RegExp('\[A-Z0-9\]')} };
}
