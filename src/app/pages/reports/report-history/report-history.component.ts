import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/http/account.service';
import { AssetsService } from 'src/app/core/http/assets.service';
import { ClasificationService } from 'src/app/core/http/clasification.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ReportService } from 'src/app/core/http/report.service';
import { SettingsService } from 'src/app/core/http/settings.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/http/auth.service';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.scss']
})
export class ReportHistoryComponent implements OnInit {

  filters: FormGroup;
  Titulo: string;
  response: any[] = [];
  historial: any[] = [];

  showReport: boolean = false;
  user: any;
  correo:any;

  accounts: any[] = [];
  clasifications: any[] = [];
  assets: any[] = [];

  filterClasification: any[] = [];
  filterAsset: any[] = [];

  
  dateDay = new Date();
  d = this.getDia(this.dateDay.getDay());
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(
    private formBuilder:FormBuilder,
    private reportService: ReportService,
    private settingService: SettingsService,
    private authService: AuthService,
    private accountService: AccountService,
    private clasificationService: ClasificationService,
    private assetService: AssetsService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.filters = this.formBuilder.group({
      IdCuenta:[null,[Validators.required]],
      IdClasificacion:[null,[Validators.required]],
      IdActivoFijo:[null,[Validators.required]],
    });
    this.settingService.getTitle().subscribe(data => {
      this.Titulo = data['ValorCadena'];
    });
    this.authService.me().subscribe(data => {
      this.user = data['givenname'] + ' ' + data['sn'];
    });
    this.chargeLists();

    this.todayWithPipe = this.pipe.transform(Date.now(), ' dd/MM/yyyy, h:mm a');
    this.authService.me().subscribe(data => {
      this.correo = data['userprincipalname'];
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
      'IdCuenta': this.filters.get('IdCuenta').value,      
      'IdClasificacion': this.filters.get('IdClasificacion').value,
      'IdActivoFijo': this.filters.get('IdActivoFijo').value,
    }
    this.response = [];   
    this.reportService.getHistoricalReport(filter).subscribe(data => {
      this.showReport = true;      
      Object.assign(this.response, data);
      this.historial = this.response['historial'];
      console.log(data);
    });
    
  }

  chargeLists(){
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

  chargeClasification(){
    let IdCuenta = this.filters.get('IdCuenta').value;
    this.filterClasification = [];
    this.clasifications.forEach(element => {
      if(element.IdCuenta == IdCuenta ){
        this.filterClasification.push(element);
      }
    });
    return this.filterClasification;
  }

  chargeAssets(){
    let IdClasificacion = this.filters.get('IdClasificacion').value;
    this.filterAsset = [];
    this.assets.forEach(element => {
      if(element.IdClasificacion == IdClasificacion){
        this.filterAsset.push(element);          
      }
    });        
    return this.filterAsset;    
  }

  downloadPDF(): void {
    this.reportService.downloadPDF();
  }

}
