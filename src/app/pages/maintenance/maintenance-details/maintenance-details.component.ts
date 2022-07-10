import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from 'src/app/core/http/assets.service';
import { AttachmentService } from 'src/app/core/http/attachment.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { MaintenanceService } from 'src/app/core/http/maintenance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-details',
  templateUrl: './maintenance-details.component.html',
  styleUrls: ['./maintenance-details.component.scss']
})
export class MaintenanceDetailsComponent implements OnInit {

  detailsMaintenance: FormGroup;
  assets: any[] = [];
  status: any[] = [];
  files: any = [];

  IdMaintenance: any;
  IdAsset: any;

  maintenanceData: any;

  constructor(
    private formBuilder:FormBuilder,   
    private router:Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private assetService: AssetsService,
    private maintenanceService: MaintenanceService,
    private errorService: ErrorService,
    private attachmentService: AttachmentService,       
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.IdMaintenance = params['id'];
      this.IdAsset = params['asset'];
    });
    this.createNewForm();
  }

  createNewForm() {
    this.detailsMaintenance = this.formBuilder.group({
      IdActivoFijo: new FormControl(null, []),
      FechaInicio: new FormControl('', []),
      FechaFin: new FormControl(this.datepipe.transform(Date.now(), 'dd/MM/yyyy'), []),
      IdEstado: new FormControl(null, []),
      Motivo: new FormControl('', []),
      VidaUtil: new FormControl('', []),
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
      if(this.detailsMaintenance!=null && this.maintenanceData!=null){
        this.detailsMaintenance.controls['IdActivoFijo'].setValue(this.maintenanceData.IdActivoFijo);
        this.detailsMaintenance.controls['FechaInicio'].setValue(this.datepipe.transform(this.maintenanceData.FechaInicio, 'dd/MM/yyyy'));
        this.detailsMaintenance.controls['IdEstado'].setValue(this.maintenanceData.IdEstado); 
        this.detailsMaintenance.controls['Motivo'].setValue(this.maintenanceData.Motivo); 
        this.detailsMaintenance.controls['VidaUtil'].setValue(this.maintenanceData.VidaUtil); 
        this.detailsMaintenance.controls['Revalorizacion'].setValue(this.maintenanceData.Revalorizacion); 
        this.detailsMaintenance.controls['Costo'].setValue(this.maintenanceData.Costo); 
        this.detailsMaintenance.controls['Observaciones'].setValue(this.maintenanceData.Observaciones); 
        this.detailsMaintenance.controls['IdArchivo'].setValue(this.maintenanceData.IdArchivo);        
        
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

  getFile(event): any{  
    const capturedFile = event.target['files'][0];
    this.files.push(capturedFile);
  } 

  cancel(){
    this.router.navigate(['/Assets/Supplies/Maintenance'], {queryParams: {id: this.IdAsset}});
  }

  downloadPDF(){    
    let pdf;
    this.maintenanceService.getMaintenance(this.IdMaintenance).subscribe(data => {       
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
}
