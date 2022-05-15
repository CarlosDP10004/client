import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  assignmentData: any;

  accounts: any[] = [];
  clasifications: any[] = [];  
  assets: any[] = [];
  files: any = [];

  filterClasification: any[] = [];
  filterAsset: any[] = [];
  id: number;

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
  }

  ngOnInit(): void {
    this.createNewForm();
  }

  createNewForm() {
    let IdAssignment = this.route.snapshot.paramMap.get("id");
    this.editAssignment = this.formBuilder.group({
      IdUnidad:['',[Validators.required]],
      IdPlaza:['',[Validators.required]],
      IdEstado:['',[Validators.required]],
      IdArchivo:['',[Validators.required]],
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

    this.assetService.getAssetList('En Bodega').subscribe(data => {
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
      console.log(data);
      if(this.editAssignment!=null && this.assignmentData!=null){
        this.editAssignment.controls['IdUnidad'].setValue(this.assignmentData.IdUnidad);
        this.editAssignment.controls['IdPlaza'].setValue(this.assignmentData.IdPlaza);
        this.editAssignment.controls['IdEstado'].setValue(this.assignmentData.IdEstado);
        this.assignmentData.asignacion.forEach((obj) => {
          const aux = this.formBuilder.group({
            IdCuenta: [{value: obj['IdCuenta'], disabled: true}],
            IdClasificacion: [{value: obj['IdClasificacion'], disabled: true}],
            IdActivoFijo: [{value: obj['IdActivoFijo'], disabled: true}]
          }); 
          this.ListaActivos.push(aux);
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
    const aux = this.formBuilder.group({
      IdCuenta: new FormControl(''),
      IdClasificacion: new FormControl(''),
      IdActivoFijo: new FormControl(''),
    });  
    this.ListaActivos.push(aux);
  }

  removeItem() {
    this.ListaActivos.removeAt(this.ListaActivos.length - 1);
 }

  async editarAsignacion(){
    let IdAssignment = this.route.snapshot.paramMap.get("id");
    let aux = new AssignmentModel();
    let archivo = await this.uploadFile(1);
    let post = aux.getAssignment(this.editAssignment, archivo['IdArchivo']);
    console.log(post);
    this.assignmentService.editAssignment(IdAssignment, post).subscribe(data => {
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Assignments']);
      }
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  chargeWorkStation(value){
    this.workStationService.getWorkStationByUnit(value).subscribe(data =>{
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
      if(element.IdClasificacion == value){
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


  get ListaActivos(): any { return this.editAssignment.get('ListaActivos') as any; }

}
