import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetsService } from 'src/app/core/http/assets.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ReportService } from 'src/app/core/http/report.service';
import { SettingsService } from 'src/app/core/http/settings.service';
import Swal from 'sweetalert2';

import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/http/auth.service';

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
  user: any;

  desde: any;
  hasta: any;
  estados: string = "";

  statusFiltered: any[] = [];

  dateDay = new Date();
  d = this.getDia(this.dateDay.getDay());
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(
    private formBuilder:FormBuilder,
    private reportService: ReportService,
    private authService: AuthService,
    private settingService: SettingsService,
    private errorService: ErrorService,
    private assetService: AssetsService
  ) { }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), ' dd/MM/yyyy, h:mm a');

    this.filters = this.formBuilder.group({
      Desde: new FormControl('', []),
      Hasta: new FormControl('', []),
      IdEstado: new FormControl(this.formBuilder.array([]))
    });
    this.settingService.getTitle().subscribe(data => {
      this.Titulo = data['ValorCadena'];
    });
    this.authService.me().subscribe(data => {
      this.user = data['givenname'] + ' ' + data['sn'];
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

  getDia(index){
    var dia = new Array(7);
    dia[0] = "Domingo";
    dia[1] = "Lunes";
    dia[2] = "Martes";
    dia[3] = "Miércoles";
    dia[4] = "Jueves";
    dia[5] = "Viernes";
    dia[6] = "Sábado";
  return dia[index];

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
