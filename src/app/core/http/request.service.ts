import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requestList: any;

  IdRequestSource = new  BehaviorSubject<number>(0);
  IdRequest: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) {
    this.IdRequest= this.IdRequestSource.asObservable();
  }


  showAll(tipo: string){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}solicitudes/${tipo}`, { headers: headers});
  }

  addRequest(request: Request){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "solicitudes", request, { headers: headers});
  }

  validateRequest(id: any, statement: any){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}validarSolicitud/${id}`, statement, { headers: headers});
  }

  getRequest(IdRequest: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}solicitud/${IdRequest}`,{ headers: headers})
  }

  getUnitBoss(IdUnit: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}unidades/getUnitBoss/${IdUnit}`,{ headers: headers})
  }
}
