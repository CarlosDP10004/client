import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Clasification } from 'src/app/models/clasification';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class ClasificationService {

  clasificationList: any;
  clasification: Clasification;

  IdclasificationSource = new  BehaviorSubject<number>(0);
  IdClasificacion: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdClasificacion= this.IdclasificationSource.asObservable();
  }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "clasificaciones", { headers: headers});
  }

  addClasificacion(clasification: Clasification){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "clasificaciones", clasification, { headers: headers});
  }

  changeClasificacionId(IdClasificacion: number){
    this.IdclasificationSource.next(IdClasificacion);
  }

  getClasificacion(IdUnidad: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}clasificaciones/${IdUnidad}`, { headers: headers});
  }

  editClasificacion(id: number, clasification: Clasification){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}clasificaciones/${id}`, clasification, { headers: headers});
  }

  getClasificacionByAccount(IdAccount: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}clasificaciones/byAccount/${IdAccount}`, { headers: headers});
  }

}
