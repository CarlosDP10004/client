import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { RequestService } from 'src/app/core/http/request.service';
import { RequestModel } from 'src/app/models/request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departures-add',
  templateUrl: './departures-add.component.html',
  styleUrls: ['./departures-add.component.scss']
})
export class DeparturesAddComponent implements OnInit {

  addRequest: FormGroup;
  departaments: any[] = [];
  status: any[] = [];
  statusRequest: any[] = [];

  accounts: any[] = [];
  clasifications: any[] = [];  
  assets: any[] = [];
  selectedAssets: any[] = [];
  files: any = [];

  filterClasification: any[] = [];
  filterAsset: any[] = [];
  filter6: any;

  
  seleccion: any;

  constructor(
    private formBuilder:FormBuilder,   
    private requestService: RequestService,
    private router:Router,
    private departamentService: DepartamentsService,
    private assetService: AssetsService,
    private errorService: ErrorService,
    private attachmentService: AttachmentService,       
    private toastr: ToastrService,
    public datepipe: DatePipe
  ) { }

  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
  }

  ngOnInit(): void {
    this.createNewForm();
  }

  createNewForm() {
    this.addRequest = this.formBuilder.group({
      Tipo:['Salida',[Validators.required]],
      FechaActual:[this.datepipe.transform(Date.now(), 'yyyy-MM-dd'),[Validators.required]],
      IdEstado:['Pendiente',[Validators.required]],
      IdUnidad:[null,[Validators.required]],
      Solicitante:['',[Validators.required]],
      IdEstadoSolicitado:[null,[Validators.required]],
      Motivo:['',[Validators.required]],
      FechaSolicitud:['',[Validators.required]], 
      IdArchivo:['',[Validators.required]],
      IdUnidadActual:[null],
      JefeUnidadActual:[''],
      FechaRetorno:[''],
      IdUnidadDestino:[null],
      JefeUnidadDestino:[''],
      DUI:[''],
      Direccion:[''],
      Telefono:[''],
      Correo:[''],
      ListaActivos: this.formBuilder.array([]),
      IdFilter:['']
    });

    this.departamentService.getDepartamentList().subscribe(data => {
      Object.assign(this.departaments, data);
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
      this.getStatusByDefault();
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });

    this.assetService.getAssetToDeparture().subscribe(data => {
      Object.assign(this.assets, data)
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

  getStatusByDefault(){    
    this.status.forEach(element => {
      if(element.Modulo == 'Activo Fijo' && (element.NombreEstado == 'Donado' || element.NombreEstado == 'Vendido')){         
        this.statusRequest.push(element);          
      }
    });
  }

  addAsset() {
    const aux = this.formBuilder.group({
      IdActivoFijo: new FormControl(''),
    });  
    this.ListaActivos.push(aux);
  }

  removeItem() {
    this.ListaActivos.removeAt(this.ListaActivos.length - 1);
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

  async guardarSolicitud(){
    if(this.addRequest.invalid){
      return Object.values(this.addRequest.controls).forEach(control=>{
        control.markAllAsTouched();
      })
    }
    let aux = new RequestModel();
    let archivo = await this.uploadFile(1);
    let post = aux._getRequest(this.addRequest, archivo['IdArchivo'], this.selectedAssets);
    this.requestService.addRequest(post).subscribe(data => {
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Departures']);
      }
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }  


  addItem(index:number, item:any){
    this.selectedAssets.unshift(item);
    let cont = 0; 
    this.assets.forEach(element => {       
      if(item.CodigoAF == element.CodigoAF)
      {
        this.assets.splice(cont,1);  
        this.filter6 = '';      
      }
      cont ++;
    });  
         
  }
  removeItem2(index:number, item:string) {
    this.assets.unshift(item);
    this.selectedAssets.splice(index,1);
  }

  
  get IdUnidad():AbstractControl{return this.addRequest.get('IdUnidad');}
  get Tipo():AbstractControl{return this.addRequest.get('Tipo');}
  get FechaActual():AbstractControl{return this.addRequest.get('FechaActual');}
  get IdEstado():AbstractControl{return this.addRequest.get('IdEstado');}
  get Solicitante():AbstractControl{return this.addRequest.get('Solicitante');}
  get IdEstadoSolicitado():AbstractControl{return this.addRequest.get('IdEstadoSolicitado');}
  get Motivo():AbstractControl{return this.addRequest.get('Motivo');}
  get FechaSolicitud():AbstractControl{return this.addRequest.get('FechaSolicitud');}
  get IdArchivo():AbstractControl{return this.addRequest.get('IdArchivo');}
  get ListaActivos(): any { return this.addRequest.get('ListaActivos') as any; }

}
