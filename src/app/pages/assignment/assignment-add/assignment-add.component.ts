import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/http/account.service';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AssignmentService } from 'src/app/core/http/assignment.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { RequestService } from 'src/app/core/http/request.service';
import { WorkStationService } from 'src/app/core/http/work-station.service';
import { AssignmentModel } from 'src/app/models/assignment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-assignment-add',
  templateUrl: './assignment-add.component.html',
  styleUrls: ['./assignment-add.component.scss']
})
export class AssignmentAddComponent implements OnInit {
  addAssignment: FormGroup;
  departaments: any[] = [];
  workStations: any[] = [];
  status: any[] = [];
  statusAssignments: any[] = [];

  accounts: any[] = [];
  clasifications: any[] = [];  
  assets: any[] = [];
  files: any = [];

  filterClasification: any[] = [];
  filterAsset: any[] = [];

  aux: any;

  constructor(
    private formBuilder:FormBuilder,   
    private assignmentService: AssignmentService,
    private workStationService: WorkStationService,
    private router:Router,
    private requestService: RequestService,
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
  }

  ngOnInit(): void {
    this.createNewForm();
  }



  createNewForm() {
    this.addAssignment = this.formBuilder.group({
      IdUnidad:[null,[Validators.required]],
      JefeUnidad: ['',[Validators.required]],
      IdPlaza:[null,[Validators.required]],
      Empleado:[null,[Validators.required]],
      IdEstado:['Pendiente',[]],
      IdArchivo:['',[Validators.required]],
      ListaActivos: this.formBuilder.array([], Validators.minLength(1))
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
    
  }

  getStatusByDefault(){    
    this.status.forEach(element => {
      if(element.Modulo == 'Solicitud'){         
        this.statusAssignments.push(element);          
      }
    });
  }

  addAsset() {
    const aux = this.formBuilder.group({
      IdCuenta: new FormControl(null),
      IdClasificacion: new FormControl(null),
      IdActivoFijo: new FormControl(null),
    });  
    this.ListaActivos.push(aux);
  }

  removeItem(index: number) {
    this.ListaActivos.removeAt(index);
 }

  async guardarAsignacion(){
    if(this.addAssignment.invalid){
      return Object.values(this.addAssignment.controls).forEach(control=>{
        control.markAllAsTouched();
      })
    } 

    let aux = new AssignmentModel();
    let archivo = await this.uploadFile(1);
    let post = aux.getAssignment(this.addAssignment, archivo['IdArchivo']);
    this.assignmentService.addAssignment(post).subscribe(data => {
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Assignments']);
      }
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  chargeWorkStation(){
    let IdUnidad = this.addAssignment.get('IdUnidad').value;
    this.workStationService.getWorkStationByUnit(IdUnidad).subscribe(data =>{
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

    this.requestService.getUnitBoss(IdUnidad).subscribe(data => {
      this.aux = data;
      this.addAssignment.controls['JefeUnidad'].setValue(this.aux.displayname[0]);      
    }, error => { 
      console.log("ocurrió un error al procesar los datos: "+ error);
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

  chargeEmployeeName(){
    let workStation = this.addAssignment.get('IdPlaza').value;
    this.addAssignment.controls['Empleado'].setValue(null);
    this.workStations.forEach(element => {
      if(element.IdPlaza == workStation){
        this.addAssignment.controls['Empleado'].setValue(element.NombrePlaza);
      }
    });
  }

  get IdUnidad():AbstractControl{return this.addAssignment.get('IdUnidad');}
  get IdPlaza():AbstractControl{return this.addAssignment.get('IdPlaza');}
  get IdArchivo():AbstractControl{return this.addAssignment.get('IdArchivo');}

  get ListaActivos(): any { return this.addAssignment.get('ListaActivos') as any; }

}
