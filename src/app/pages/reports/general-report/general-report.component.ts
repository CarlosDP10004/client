import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/core/http/report.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SettingsService } from 'src/app/core/http/settings.service';

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
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      const pageCount = (docResult as any).internal.getNumberOfPages(); 
      for (let i = 1; i <= pageCount; i++ ) {
        docResult.setPage(i);
        docResult.setFontSize(10);
        docResult.setTextColor(150);
        docResult.text('Pagina ' + i + ' de ' + pageCount, (docResult.internal.pageSize.getWidth()/2.25), (docResult.internal.pageSize.getHeight()-8));      
      }    
      
      docResult.save(`${new Date().toISOString()}_general.pdf`);
    });
  }


  async pdf() {
    const DATA =  document.getElementById('htmlData');
    const options = {
      background: 'white',
      scale: 3

    };
    html2canvas(DATA, options).then((canvas) => {
        var imgWidth = 210;
        var pageHeight = 290;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight; 
  
        var doc = new jsPDF('l', 'mm');
        var position = 0;
        var pageData = canvas.toDataURL('image/jpeg', 1.0);
        var imgData = encodeURIComponent(pageData);
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        doc.setLineWidth(5);
        doc.setDrawColor(255, 255, 255);
        doc.rect(0, 0, 210, 295);
        heightLeft -= pageHeight;
        
        if (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage([imgWidth, imgHeight]);          
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          doc.setLineWidth(5);
          doc.setDrawColor(255, 255, 255);
          doc.rect(0, 0, 210, 295);
          heightLeft -= pageHeight;          
        }
        return doc;        
    }).then((docResult) => {
      const pageCount = (docResult as any).internal.getNumberOfPages(); 
      for (let i = 1; i <= pageCount; i++ ) {
        docResult.setPage(i);
        docResult.setFontSize(10);
        docResult.setTextColor(150);
        docResult.text('Pagina ' + i + ' de ' + pageCount, (docResult.internal.pageSize.getWidth()/2.25), (docResult.internal.pageSize.getHeight()-8));      
      }
      docResult.save(`${new Date().toISOString()}_general.pdf`);
    });
  }

}
