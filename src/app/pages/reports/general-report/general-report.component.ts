import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/core/http/report.service';
import { SettingsService } from 'src/app/core/http/settings.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss']
})
export class GeneralReportComponent implements OnInit {

  filters: FormGroup;
  Titulo: string;
  response: any[] = [];
  showReport: boolean = false;

  desde: any;
  hasta: any;  

  dateDay = new Date();
  d = this.getDia(this.dateDay.getDay());
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(
    private formBuilder:FormBuilder,
    private reportService: ReportService,
    private settingService: SettingsService
  ) { }

  ngOnInit(): void {
    this.filters = this.formBuilder.group({
      Desde:['',[Validators.required]],
      Hasta:['',[Validators.required]]
    });
    this.settingService.getTitle().subscribe(data => {
      this.Titulo = data['ValorCadena'];
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
    }
    this.setRange();    
    this.reportService.getGeneral(filter).subscribe(data => {
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
