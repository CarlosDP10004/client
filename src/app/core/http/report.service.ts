import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable'

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { }


  getGeneral(filters: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "reportes/general", filters, { headers: headers});
  }

  getDepreciation(filters: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "reportes/depreciacion", filters, { headers: headers});
  }

  getAmortization(filters: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "reportes/amortizacion", filters, { headers: headers});
  }

  getReportByUnits(filters: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "reportes/unidad", filters, { headers: headers});
  }

  getReportByStatus(filters: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "reportes/estado", filters, { headers: headers});
  }

  getHistoricalReport(filters: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "reportes/historico", filters, { headers: headers});
  }

  
  // Test para descargar desde servicio
  downloadPDF(): void { 
    const DATA = document.getElementById('Titulo');
    const doc = new jsPDF('l', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,           
    };
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      autoTable(doc, {
        styles: {
          overflow: 'linebreak',
          fontSize: 8,
          valign: 'middle',
          font: 'helvetica',
          fillColor: [255, 255, 255], //Color de fondo de tabla
          halign: 'left', //alineacion de los elementos de la tabla
          lineColor: [168, 168, 168], //color interno de las lineas
          
        }, 
        tableLineWidth: 0.1, //grosor de la linea externa de la tabla
        tableLineColor: [0,0,0], //color externo de la tabla          
        theme: 'grid',    //tema de cuadricula si se le quita toma por defecto el striped    
        margin:{top: pdfHeight + 15},
        html: '#Reporte',
        useCss: true, //Sustituye el Style defaultpor el implementado propio
        headStyles : { //Estilo de los encabezados
                       halign: 'center', 
                       textColor: [255, 255, 255], 
                       fillColor:[49, 57, 69 ], 
                       lineWidth: 0.3, 
                       lineColor:[0, 0, 0]
                      }          
      });
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++ ) {
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Pagina ' + i + ' de ' + pageCount, (doc.internal.pageSize.getWidth()/2.25), (doc.internal.pageSize.getHeight()-8));      
      } 
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_report.pdf`);
    });    
  }

  downloadPDF2(): void { 
    const DATA = document.getElementById('Titulo');
    const doc = new jsPDF('p', 'pt', 'a4');
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

      autoTable(doc, {
        styles: {
          overflow: 'linebreak',
          fontSize: 8,
          valign: 'middle'
        },
        margin:{top: pdfHeight + 15},
        html: '#Reporte'
      });

      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');      
      const pageCount = (doc as any).internal.getNumberOfPages();
      
      for (let i = 1; i <= pageCount; i++ ) {        
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text('Pagina ' + i + ' de ' + pageCount, (doc.internal.pageSize.getWidth()/2.25), (doc.internal.pageSize.getHeight()-8));      
      } 
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_report.pdf`);
    });    
  }
  
}
