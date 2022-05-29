import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

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
}
