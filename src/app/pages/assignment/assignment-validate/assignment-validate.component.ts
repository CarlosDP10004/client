import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AssignmentService } from 'src/app/core/http/assignment.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { WorkStationService } from 'src/app/core/http/work-station.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment-validate',
  templateUrl: './assignment-validate.component.html',
  styleUrls: ['./assignment-validate.component.scss']
})
export class AssignmentValidateComponent implements OnInit {

  validateAssignment: FormGroup;
  departaments: any[] = [];
  workStations: any[] = [];
  status: any[] = [];
  statusAssignments: any[] = [];
  assignmentData: any;
  bsModalRef: BsModalRef;

  accounts: any[] = [];
  clasifications: any[] = [];  
  assets: any[] = [];
  files: any = [];

  filterClasification: any[] = [];
  filterAsset: any[] = [];
  filterAssetEdit: any[] = [];
  id: number;
  flagFile: number = 0;

  edit: boolean = false;

  currentStatus: boolean = false;

  constructor(
    private formBuilder:FormBuilder,   
    private assignmentService: AssignmentService,
    private workStationService: WorkStationService,
    private router:Router,
    private route: ActivatedRoute,
    private departamentService: DepartamentsService,
    private assetService: AssetsService,
    private errorService: ErrorService,
    private accountService: AccountService,
    private clasificationService: ClasificationService,
    private attachmentService: AttachmentService,       
    private toastr: ToastrService,
  ) { }

  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
    this.flagFile = 1;
  }

  thereIsChange(flag: number){
    if(flag == 1){
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.createNewForm();
  }

  createNewForm() {
    let IdAssignment = this.route.snapshot.paramMap.get("id");
    this.validateAssignment = this.formBuilder.group({
      IdUnidad:['',[Validators.required]],
      IdPlaza:['',[Validators.required]],
      IdEstado:['',[Validators.required]],
      IdArchivo:['',[Validators.required]],
      ListaActivosAsignados: this.formBuilder.array([]),
      ListaActivos: this.formBuilder.array([])
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
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
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

    this.clasificationService.getClasificationList().subscribe(data => {
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

    this.assetService.getAssetList().subscribe(data => {
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

    this.assignmentService.getAssignment(IdAssignment).subscribe(data => {
      this.assignmentData = data;
      this.chargeWorkStation(this.assignmentData.IdUnidad);
      if(this.validateAssignment!=null && this.assignmentData!=null){
        this.validateAssignment.controls['IdUnidad'].setValue(this.assignmentData.IdUnidad);
        this.validateAssignment.controls['IdPlaza'].setValue(this.assignmentData.IdPlaza);
        this.validateAssignment.controls['IdEstado'].setValue(this.assignmentData.IdEstado);
        this.currentStatus =  this.assignmentData.estado.NombreEstado == 'Pendiente' ? true : false;
        this.assignmentData.asignacion.forEach((obj) => {
          let asset = this.formBuilder.group({
            IdCuenta: new FormControl(obj['IdCuenta']),
            IdClasificacion: new FormControl(obj['IdClasificacion']),
            IdActivoFijo: new FormControl(obj['IdActivoFijo'])
          }); 
          asset.getRawValue()
          this.ListaActivosAsignados.push(asset);
        });
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


 validarSolicitud(){
  let IdAssignment = this.route.snapshot.paramMap.get("id");
  let postData = {
    'Dictamen': 'Aprobado'
  };    
  this.assignmentService.validateAssignment(IdAssignment, postData).subscribe(data => {
    if(data!=null){
      this.toastr.success(data.toString());
      this.router.navigate(['/Assets/Assignments']);
    }
  }, error => {
    this.toastr.error(this.errorService.getErrorMessage(error.error));
  });
}  

rechazarAsignacion(){
  let IdAssignment = this.route.snapshot.paramMap.get("id");
  let postData = {
    'Dictamen': 'Rechazado'
  };    
  this.assignmentService.validateAssignment(IdAssignment, postData).subscribe(data => {
    if(data!=null){
      this.toastr.success(data.toString());
      this.router.navigate(['/Assets/Assignments']);
    }
  }, error => {
    this.toastr.error(this.errorService.getErrorMessage(error.error));
  });
}

  chargeWorkStation(value){
    this.workStationService.getWorkStationAssigned(value).subscribe(data =>{
      Object.assign(this.workStations, data);
    }, error =>{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });
  }

  chargeClasification(value){
    this.filterClasification = [];
    this.clasifications.forEach(element => {
      if(element.IdCuenta == value){
        this.filterClasification.push(element);
      }
    });
    return this.filterClasification;
  }

  chargeAssets(value){
    this.filterAsset = [];
    this.assets.forEach(element => {
      if(element.IdClasificacion == value && element.NombreEstado == 'En Bodega'){
        this.filterAsset.push(element);          
      }
    });        
    return this.filterAsset;    
  }

  chargeAssignedAssets(value){
    this.filterAsset = [];
    this.assets.forEach(element => {
      if(element.IdClasificacion == value){
        this.filterAsset.push(element);          
      }
    });        
    return this.filterAsset;    
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

  

  downloadPDF(){
    let IdAssignment = this.route.snapshot.paramMap.get("id");
    let pdf;
    this.assignmentService.getAssignment(IdAssignment).subscribe(data => {       
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


  get ListaActivos(): any { return this.validateAssignment.get('ListaActivos') as any; }
  get ListaActivosAsignados(): any { return this.validateAssignment.get('ListaActivosAsignados') as any; }

}
