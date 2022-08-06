import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/http/account.service';
import { ErrorService } from 'src/app/core/http/error.service';
import { ReportService } from 'src/app/core/http/report.service';
import { SettingsService } from 'src/app/core/http/settings.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-depreciation',
  templateUrl: './depreciation.component.html',
  styleUrls: ['./depreciation.component.scss']
})
export class DepreciationComponent implements OnInit {

  filters: FormGroup;
  Titulo: string;
  response: any[] = [];
  showReport: boolean = false;

  desde: any;
  hasta: any;
  year: number;
  
  accounts: any[] = [];

  dateDay = new Date();
  d = this.getDia(this.dateDay.getDay());
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(
    private formBuilder:FormBuilder,
    private reportService: ReportService,
    private accountService: AccountService,
    private errorService: ErrorService,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.todayWithPipe = this.pipe.transform(Date.now(), ' dd/MM/yyyy, h:mm a');

    this.filters = this.formBuilder.group({
      Desde:['',[Validators.required]],
      Hasta:['',[Validators.required]],
      IdCuenta: new FormControl(this.formBuilder.array([]))
    });
    this.settingService.getTitle().subscribe(data => {
      this.Titulo = data['ValorCadena'];
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
    let date: Date = new Date();
    this.year = date.getFullYear();
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
      'IdCuenta': this.filters.get('IdCuenta').value.length > 0 ? this.filters.get('IdCuenta').value : []
    }
    this.response = [];
    this.setRange();    
    this.reportService.getDepreciation(filter).subscribe(data => {
      this.showReport = true;      
      Object.assign(this.response, data);
    });
    
  }

  setRange(){
    this.desde = this.filters.get('Desde').value;
    this.hasta = this.filters.get('Hasta').value;
  }

  downloadPDF(): void {
    this.reportService.downloadPDF();
  }
}
