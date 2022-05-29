import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/core/http/error.service';
import { ReportService } from 'src/app/core/http/report.service';
import { SettingsService } from 'src/app/core/http/settings.service';

@Component({
  selector: 'app-general-report',
  templateUrl: './general-report.component.html',
  styleUrls: ['./general-report.component.scss']
})
export class GeneralReportComponent {

  filters: FormGroup;
  response: any[] = [];
  
  display: boolean = false;
  Titulo: string;

  desde: any;
  hasta: any;

  constructor(
    private builder: FormBuilder,
    private reportService: ReportService,
    private settingService: SettingsService,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) {
    this.filters = this.builder.group({      
      Desde: new FormControl('', []),
      Hasta: new FormControl('', [])
    });

    this.settingService.getTitle().subscribe(data => {
      this.Titulo = data['ValorCadena'];
    });
  }

  getReport(){
    let filters = {
      'Desde': this.filters.get('Desde').value,      
      'Hasta': this.filters.get('Hasta').value,
    }   

    this.reportService.generalReport(filters).subscribe(data => {
      this.display = true;
      this.showRange();
      Object.assign(this.response, data);
    }, error => {
      this.toastr.error(this.errorService.getErrorMessage(error.error));
    });

  }

  showRange(){
    this.desde = this.filters.get('Desde').value;
    this.hasta = this.filters.get('Hasta').value;
  }


  public downloadPDF(): void {
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
      const pages = (doc as any).internal.getNumberOfPages();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height; 
      doc.setFontSize(10);              
      for (let j = 1; j < pages + 1 ; j++) {
            let horizontalPos = pageWidth / 2;
            let verticalPos = pageHeight - 10; 
            doc.setPage(j);
            doc.text(`${j} de ${pages}`, horizontalPos, verticalPos, {align: 'center'}); 
      } 
      docResult.save(`${new Date().toISOString()}_general.pdf`);
    });
    
  }

}
