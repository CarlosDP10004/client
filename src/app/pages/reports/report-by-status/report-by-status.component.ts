import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetsService } from 'src/app/core/http/assets.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ReportService } from 'src/app/core/http/report.service';
import { SettingsService } from 'src/app/core/http/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-by-status',
  templateUrl: './report-by-status.component.html',
  styleUrls: ['./report-by-status.component.scss']
})
export class ReportByStatusComponent implements OnInit {

  filters: FormGroup;
  Titulo: string;
  response: any[] = [];
  status: any[] = [];
  showReport: boolean = false;

  desde: any;
  hasta: any;
  estados: string = "";

  statusFiltered: any[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private reportService: ReportService,
    private settingService: SettingsService,
    private errorService: ErrorService,
    private assetService: AssetsService
  ) { }

  ngOnInit(): void {
    this.filters = this.formBuilder.group({
      Desde: new FormControl('', []),
      Hasta: new FormControl('', []),
      IdEstado: new FormControl(this.formBuilder.array([]))
    });
    this.settingService.getTitle().subscribe(data => {
      this.Titulo = data['ValorCadena'];
    });

    this.assetService.getEstados().subscribe(data => {
      Object.assign(this.status, data);
      this.statusAssets();
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

  getReport(){
    let filter = {
      'Desde': this.filters.get('Desde').value,      
      'Hasta': this.filters.get('Hasta').value,
      'IdEstado': this.filters.get('IdEstado').value.length > 0 ? this.filters.get('IdEstado').value : []
    }
    this.estados = "";
    this.response = []; 
    this.setRange();   
    
    this.reportService.getReportByStatus(filter).subscribe(data => {
      this.showReport = true;
      
      Object.assign(this.response, data);
    });
    
  }

  setRange(){
    this.desde = this.filters.get('Desde').value;
    this.hasta = this.filters.get('Hasta').value;
    this.setStatus(this.filters.get('IdEstado').value);
  }

  setStatus(lista: any[]){
    this.status.forEach(obj => {
      if(lista[0] != null){
        lista.forEach(element => {
          if(obj.IdEstado == element && this.estados != ""){
            this.estados = this.estados + obj.NombreEstado + ' - ';
          }
          if(obj.IdEstado == element && this.estados == ""){
            this.estados = ' - ' + obj.NombreEstado + ' - ';
          }
        });
      }      
    });
  }

  downloadPDF(): void {
    this.reportService.downloadPDF();
  }

  statusAssets(){
    this.status.forEach(element => {
      if(element.Modulo == 'Activo Fijo'){
        this.statusFiltered.push(element);
      }
    });
  }

}
