import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { }

  uploadFiles(files: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "subirAdjunto", files,{ headers: headers});
  }

  updateAttachment(files: any, id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(`${API_URL}actualizarAdjunto/${id}`, files,{ headers: headers});
  }

  getImage(path: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}imagenActivo/${path}` ,{ headers: headers});
  }

  getPathImage(name: string){
    return API_URL + 'imagenActivo/'+ name;
  }

  downloadPDF(name: string){
    return API_URL + 'pdfActivo/'+ name;
  }
}
