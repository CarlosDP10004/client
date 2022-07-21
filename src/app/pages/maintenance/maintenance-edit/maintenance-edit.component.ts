import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { CalculationService } from 'src/app/core/http/calculation.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { MaintenanceService } from 'src/app/core/http/maintenance.service';
import { MaintenanceModel } from 'src/app/models/maintenance';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-edit',
  templateUrl: './maintenance-edit.component.html',
  styleUrls: ['./maintenance-edit.component.scss']
})
export class MaintenanceEditComponent implements OnInit {
  editMaintenance: FormGroup;
  assets: any[] = [];
  status: any[] = [];
  files: any = [];

  IdMaintenance: any;
  IdAsset: any;

  maintenanceData: any;

  assetData: any;

  constructor(
    private formBuilder:FormBuilder,   
    private router:Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private assetService: AssetsService,
    private maintenanceService: MaintenanceService,
    private errorService: ErrorService,
    private calculateService: CalculationService,
    private attachmentService: AttachmentService,       
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.IdMaintenance = params['id'];
      this.IdAsset = params['asset'];
    });
    this.assetService.getAsset(this.IdAsset).subscribe(data => {
      this.assetData = data;
    });
    this.createNewForm();
  }

  createNewForm() {
    this.editMaintenance = this.formBuilder.group({
      IdActivoFijo: new FormControl(null, []),
      FechaInicio: new FormControl('', []),
      FechaFin: new FormControl(this.datepipe.transform(Date.now(), 'dd/MM/yyyy'), []),
      IdEstado: new FormControl(null, []),
      Motivo: new FormControl('', []),
      VidaUtil: new FormControl('', []),
      EsRevalorizable: new FormControl(false, []),
      Revalorizacion: new FormControl('', []),
      Costo: new FormControl('', []),
      Observaciones: new FormControl('', []),
      IdArchivo: new FormControl('', []),
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
    this.maintenanceService.getMaintenance(this.IdMaintenance).subscribe(data => {
      this.maintenanceData = data;
      if(this.editMaintenance!=null && this.maintenanceData!=null){
        this.editMaintenance.controls['IdActivoFijo'].setValue(this.maintenanceData.IdActivoFijo);
        this.editMaintenance.controls['FechaInicio'].setValue(this.datepipe.transform(this.maintenanceData.FechaInicio, 'dd/MM/yyyy'));
        this.editMaintenance.controls['IdEstado'].setValue(this.maintenanceData.IdEstado); 
        this.editMaintenance.controls['Motivo'].setValue(this.maintenanceData.Motivo); 
        this.editMaintenance.controls['VidaUtil'].setValue(this.maintenanceData.VidaUtil); 
        this.editMaintenance.controls['EsRevalorizable'].setValue(this.maintenanceData.EsRevalorizable);
        this.editMaintenance.controls['Revalorizacion'].setValue(this.maintenanceData.Revalorizacion); 
        this.editMaintenance.controls['Costo'].setValue(this.maintenanceData.Costo); 
        this.editMaintenance.controls['Observaciones'].setValue(this.maintenanceData.Observaciones); 
        this.editMaintenance.controls['IdArchivo'].setValue(this.maintenanceData.IdArchivo);        
        
      }
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    })
    
  }

  async guardarMantenimiento(){
    let aux = new MaintenanceModel();
    let archivo = await this.uploadFile(1);
    let post = aux._getMaintenance(this.editMaintenance, archivo['IdArchivo']);
    this.maintenanceService.editMaintenance(this.IdMaintenance, post).subscribe(data => {
      if(data!=null){
        this.toastr.success(data.toString());
        this.router.navigate(['/Assets/Supplies/Maintenance'], {queryParams: {id: this.IdAsset}});
      }
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });
  }

  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
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

  cancel(){
    this.router.navigate(['/Assets/Supplies/Maintenance'], {queryParams: {id: this.IdAsset}});
  }

  calculateValues(){
    let values = {
      'VidaUtil': this.editMaintenance.get('VidaUtil').value,
      'FechaFin': this.editMaintenance.get('FechaFin').value,
      'Costo': this.editMaintenance.get('Costo').value,
    }  
    this.editMaintenance.controls['Revalorizacion'].setValue(this.calculateService.calculateRevaluation(this.assetData, values));    
  }

}
