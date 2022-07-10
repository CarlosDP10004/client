import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssetsService } from 'src/app/core/http/assets.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { MaintenanceService } from 'src/app/core/http/maintenance.service';
import { MaintenanceModel } from 'src/app/models/maintenance';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maintenance-add',
  templateUrl: './maintenance-add.component.html',
  styleUrls: ['./maintenance-add.component.scss']
})
export class MaintenanceAddComponent implements OnInit {

  page: number = 1;
  addMaintenance: FormGroup;
  event: EventEmitter<any>=new EventEmitter();

  id: any;
  assets: any[] = [];

  requestData: any;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private maintenanceService: MaintenanceService,
    private route: ActivatedRoute,
    private router:Router,
    public datepipe: DatePipe,
    private assetService: AssetsService,
    private errorService: ErrorService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.createNewForm();
  }

  createNewForm() {
    this.addMaintenance = this.builder.group({ 
      IdActivoFijo: new FormControl(this.id, []),
      FechaInicio: new FormControl(this.datepipe.transform(Date.now(), 'dd/MM/yyyy'), []),
      Estado: new FormControl('Iniciado', []),
      Motivo: new FormControl('', [])
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

  async guardarMantenimiento(){    
    let aux = new MaintenanceModel();
    let postData = await aux.getMaintenance(this.addMaintenance, this.id);
    this.maintenanceService.addMaintenance(postData).subscribe(data=>{
      this.toastr.success(data.toString());
      this.router.navigate(['/Assets/Supplies/Maintenance'], {queryParams: {id: this.id}});
    }, (error)=>{      
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });    
  }

  cancel(){
    this.router.navigate(['/Assets/Supplies/Maintenance'], {queryParams: {id: this.id}});
  }
}
