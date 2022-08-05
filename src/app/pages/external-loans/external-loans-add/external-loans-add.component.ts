import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { RequestService } from 'src/app/core/http/request.service';
import { ValidatorService } from 'src/app/core/http/validator.service';
import { RequestModel } from 'src/app/models/request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-external-loans-add',
  templateUrl: './external-loans-add.component.html',
  styleUrls: ['./external-loans-add.component.scss']
})
export class ExternalLoansAddComponent implements OnInit {

  addRequest: FormGroup;
  filter8: any;
  departaments: any[] = [];
  status: any[] = [];
  statusRequest: any[] = [];

  accounts: any[] = [];
  clasifications: any[] = [];  
  assets: any[] = [];
  selectedAssets: any[] = [];
  files: any = [];

  filterClasification: any[] = [];

  
  seleccion: any;
  aux: any;

  constructor(
    private formBuilder:FormBuilder,   
    private requestService: RequestService,
    private router:Router,
    private departamentService: DepartamentsService,
    private assetService: AssetsService,
    private errorService: ErrorService,
    private attachmentService: AttachmentService,       
    private toastr: ToastrService,
    public datepipe: DatePipe,
    public val: ValidatorService
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
      Tipo:['Externo',[Validators.required]],
      FechaActual:[this.datepipe.transform(Date.now(), 'yyyy-MM-dd'),[Validators.required]],
      IdEstado:['Pendiente',[Validators.required]],
      IdUnidad:[null,[Validators.required]],
      Solicitante:['',[Validators.required]],
      IdEstadoSolicitado:['Prestado externamente',[Validators.required]],
      Motivo:['',[Validators.required]],
      FechaSolicitud:['',[Validators.required]], 
      IdArchivo:['',[Validators.required]],
      IdUnidadActual:[null,[Validators.required]],
      JefeUnidadActual:['',[Validators.required]],
      FechaRetorno:['',[Validators.required]],
      IdUnidadDestino:[null,[Validators.required]],
      JefeUnidadDestino:['',[Validators.required]],
      DUI:['',[Validators.required]],
      Direccion:['',[Validators.required]],
      Telefono:['',[Validators.required]],
      Correo:['',[Validators.required]],
      ListaActivos: this.formBuilder.array([])
    }, {
      validators: this.val.validEmail('Correo')
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
  }

  getStatusByDefault(){    
    this.status.forEach(element => {
      if(element.Modulo == 'Activo Fijo'){         
        this.statusRequest.push(element);          
      }
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

  async guardarSolicitud(){     
    let aux = new RequestModel();
    let archivo = await this.uploadFile(1);
    let post = aux._getRequest(this.addRequest, archivo['IdArchivo'], this.selectedAssets);
    this.requestService.addRequest(post).subscribe(data => {
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/External-Loans']);
      }
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }  

  chargeBoss(){
    let IdUnit = this.addRequest.get('IdUnidadActual').value;
    this.requestService.getUnitBoss(IdUnit).subscribe(data => {
      this.aux = data;
      this.addRequest.controls['JefeUnidadActual'].setValue(this.aux.displayname[0]);
      this.assetService.getAssetToLoan(IdUnit).subscribe(data => {
        Object.assign(this.assets, data)
      }, error => {
        console.log("ocurrió un error al procesar los datos: "+ error); 
      }); 
    }, error => { 
      console.log("ocurrió un error al procesar los datos: "+ error);
    });
    
  }  

  get ListaActivos(): any { return this.addRequest.get('ListaActivos') as any; }

  addItem(index:number, item:any){
    this.selectedAssets.unshift(item);
    let cont = 0; 
    this.assets.forEach(element => {       
      if(item.CodigoAF == element.CodigoAF)
      {
        this.assets.splice(cont,1);
        this.filter8= '';
      }
      cont ++;
    });  
         
  }
  removeItem2(index:number, item:string) {
    this.assets.unshift(item);
    this.selectedAssets.splice(index,1);
  }

}
