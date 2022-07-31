import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AssignmentService } from 'src/app/core/http/assignment.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { WorkStationService } from 'src/app/core/http/work-station.service';
import { AssignmentModel } from 'src/app/models/assignment';
import Swal from 'sweetalert2';
import { AssignmentRemoveComponent } from '../assignment-remove/assignment-remove.component';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {
  editAssignment: FormGroup;
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

  warning: boolean = false;

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
    private bsModalService: BsModalService,
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
    this.editAssignment = this.formBuilder.group({
      IdUnidad:['',[Validators.required]],
      IdPlaza:['',[Validators.required]],
      Empleado:['',[Validators.required]],
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
      this.chargeWorkStation(this.assignmentData.IdUnidad, this.assignmentData.IdPlaza);
      
      if(this.editAssignment!=null && this.assignmentData!=null){
        this.editAssignment.controls['IdUnidad'].setValue(this.assignmentData.IdUnidad);
        this.editAssignment.controls['IdPlaza'].setValue(this.assignmentData.IdPlaza);
        this.editAssignment.controls['IdEstado'].setValue(this.assignmentData.IdEstado);         
        this.warning = this.assignmentData.estado.NombreEstado == 'Aprobada' ? true : false;
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

  addAsset() {
    let aux = this.formBuilder.group({
      IdCuenta: new FormControl(),
      IdClasificacion: new FormControl(),
      IdActivoFijo: new FormControl(),
    });  
    this.ListaActivos.push(aux);
  }

  removeItem(index:number) {
    this.ListaActivos.removeAt(index);
 }

  async editarAsignacion(){
    
    let IdAssignment = this.route.snapshot.paramMap.get("id");
    let aux = new AssignmentModel();
    let archivo: any = this.thereIsChange(this.flagFile) ? await this.uploadFile(1, IdAssignment) : 0;
    let post = aux.getAssignment(this.editAssignment, archivo['IdArchivo']);
    this.assignmentService.editAssignment(IdAssignment, post).subscribe(data => {
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Assignments']);
      }
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  chargeWorkStation(unidad, plaza){
    this.workStationService.getWorkStationAssigned(unidad).subscribe(data =>{
      Object.assign(this.workStations, data);
      this.chargeEmployeeName(plaza);
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

  removeAssignment(IdAssignment:any, i:any){
    this.assignmentService.changeAssignmentId(IdAssignment);
    this.bsModalRef = this.bsModalService.show(AssignmentRemoveComponent);
    this.bsModalRef.content.event.subscribe(result => {
      if (result == 'OK') {
        this.ListaActivosAsignados.removeAt(this.ListaActivos[i]);
        this.createNewForm();
      }
    });
  }

  getStatusByDefault(){    
    this.status.forEach(element => {
      if(element.Modulo == 'Solicitud'){         
        this.statusAssignments.push(element);          
      }
    });
  }

  chargeEmployeeName(value){
    this.editAssignment.controls['Empleado'].setValue(null);
    this.workStations.forEach(element => {
      if(element.IdPlaza == value){
        this.editAssignment.controls['Empleado'].setValue(element.NombreEmpleado);
      }
    });
  }


  get ListaActivos(): any { return this.editAssignment.get('ListaActivos') as any; }
  get ListaActivosAsignados(): any { return this.editAssignment.get('ListaActivosAsignados') as any; }

}

