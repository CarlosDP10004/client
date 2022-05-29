import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { RequestService } from 'src/app/core/http/request.service';
import { RequestModel } from 'src/app/models/request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-discharges-validate',
  templateUrl: './discharges-validate.component.html',
  styleUrls: ['./discharges-validate.component.scss']
})
export class DischargesValidateComponent implements OnInit {

  validateRequest: FormGroup;
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

  requestData: any;
  seleccion: any;

  constructor(
    private formBuilder:FormBuilder,   
    private requestService: RequestService,
    private router:Router,
    private route: ActivatedRoute,
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

  async createNewForm() {
    this.validateRequest = this.formBuilder.group({
      Tipo:['',[Validators.required]],
      FechaRegistro:['',[Validators.required]],
      IdEstado:['',[Validators.required]],
      IdUnidad:['',[Validators.required]],
      Solicitante:['',[Validators.required]],
      IdEstadoSolicitado:['',[Validators.required]],
      Motivo:['',[Validators.required]],
      FechaSolicitud:['',[Validators.required]], 
      IdArchivo:['',[Validators.required]],
      ListaActivos: this.formBuilder.array([])
    });
    
    await this.chargeLists();
    console.log(this.assets);
    let IdRequest = this.route.snapshot.paramMap.get("id");
    this.requestService.getRequest(IdRequest).subscribe(data => {
      this.requestData = data;
      
      if(this.validateRequest!=null && this.requestData!=null){
        this.validateRequest.controls['Tipo'].setValue(this.requestData.Tipo);
        this.validateRequest.controls['IdUnidad'].setValue(this.requestData.IdUnidad);
        this.validateRequest.controls['FechaRegistro'].setValue(this.datepipe.transform(this.requestData.FechaRegistro, 'yyyy-MM-dd'));
        this.validateRequest.controls['IdEstado'].setValue(this.requestData.IdEstado);        
        this.validateRequest.controls['Solicitante'].setValue(this.requestData.Solicitante); 
        this.validateRequest.controls['IdEstadoSolicitado'].setValue(this.requestData.IdEstadoSolicitado); 
        this.validateRequest.controls['FechaSolicitud'].setValue(this.datepipe.transform(this.requestData.FechaSolicitud, 'yyyy-MM-dd'));               
        this.validateRequest.controls['Motivo'].setValue(this.requestData.Motivo); 
        console.log(this.requestData.activos);  
        
        this.assets.forEach(element => {
          this.requestData.activos.forEach(obj => {
            if(element.IdActivoFijo == obj.IdActivoFijo){
              this.selectedAssets.push(element);                       
            }
            console.log(obj);            
          });          
        });       
        console.log(this.selectedAssets);
      }
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


  chargeAssets(){
    this.filterAsset = [];
    this.assets.forEach(element => {      
      if(element.NombreEstado == 'Asignado'){
        this.filterAsset.push(element);     
      }
    });
    return this.filterAsset;
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

  async validarSolicitud(){
    let IdAssignment = this.route.snapshot.paramMap.get("id");
    let postData = {
      'Dictamen': 'Aprobado'
    };    
    this.requestService.validateRequest(IdAssignment, postData).subscribe(data => {
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Discharges']);
      }
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }  

  rechazarSolicitud(){
    let IdAssignment = this.route.snapshot.paramMap.get("id");
    let postData = {
      'Dictamen': 'Rechazado'
    };    
    this.requestService.validateRequest(IdAssignment, postData).subscribe(data => {
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Discharges']);
      }
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  chargeLists(){
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

    this.assetService.getAssetList().subscribe(data => {
      Object.assign(this.assets, data)
      this.chargeAssets();
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


}
