import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/core/http/report.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SettingsService } from 'src/app/core/http/settings.service';

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
    let date: Date = new Date();
    this.year = date.getFullYear();
  }

  getReport(){
    let filter = {
      'Desde': this.filters.get('Desde').value,      
      'Hasta': this.filters.get('Hasta').value,
    }
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
