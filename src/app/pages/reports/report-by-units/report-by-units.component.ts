import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartamentsService } from 'src/app/core/http/departaments.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ReportService } from 'src/app/core/http/report.service';
import { SettingsService } from 'src/app/core/http/settings.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/http/auth.service';

@Component({
  selector: 'app-report-by-units',
  templateUrl: './report-by-units.component.html',
  styleUrls: ['./report-by-units.component.scss']
})
export class ReportByUnitsComponent implements OnInit {

  filters: FormGroup;
  Titulo: string;
  response: any[] = [];
  units: any[] = [];
  showReport: boolean = false;
  user: any;
  correo:any;

  desde: any;
  hasta: any;
  unidades: string = "";

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
    private departamentService: DepartamentsService
  ) { }

  ngOnInit(): void {
    this.filters = this.formBuilder.group({
      Desde: new FormControl('', []),
      Hasta: new FormControl('', []),
      IdUnidad: new FormControl(this.formBuilder.array([]))
    });
    this.settingService.getTitle().subscribe(data => {
      this.Titulo = data['ValorCadena'];
    });
    this.authService.me().subscribe(data => {
      this.user = data['givenname'] + ' ' + data['sn'];
    });
    this.departamentService.getDepartamentList().subscribe(data => {
      Object.assign(this.units, data);
    }, error => { 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: this.errorService.getErrorMessage(error.error),
        confirmButtonColor: '#c9a892',
        confirmButtonText: 'Aceptar'
      }) 
    });
    this.authService.me().subscribe(data => {
      this.correo = data['userprincipalname'];
    });

    this.todayWithPipe = this.pipe.transform(Date.now(), ' dd/MM/yyyy, h:mm a');
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
      'IdUnidad': this.filters.get('IdUnidad').value.length > 0 ? this.filters.get('IdUnidad').value : []
    }
    this.unidades = "";
    this.response = []; 
    this.setRange();    
    this.reportService.getReportByUnits(filter).subscribe(data => {
      this.showReport = true;
      
      Object.assign(this.response, data);
    });
    
  }

  setRange(){
    this.desde = this.filters.get('Desde').value;
    this.hasta = this.filters.get('Hasta').value;
    this.setUnits(this.filters.get('IdUnidad').value);
  }

  setUnits(lista: any[]){
    this.units.forEach(obj => {
      if(lista[0] != null){
        lista.forEach(element => {
          if(obj.IdUnidad == element && this.unidades != ""){
            this.unidades = this.unidades + obj.NombreUnidad + ' - ';
          }
          if(obj.IdUnidad == element && this.unidades == ""){
            this.unidades = ' - ' + obj.NombreUnidad + ' - ';
          }
        });
      }
    });
  }

  downloadPDF(): void {
    this.reportService.downloadPDF();
  }

}
