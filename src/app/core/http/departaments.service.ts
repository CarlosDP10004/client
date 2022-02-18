import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Departament } from 'src/app/models/departament';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class DepartamentsService {

  departamentList: any;
  departament: Departament;

  IdDepartamentSource = new  BehaviorSubject<number>(0);
  IdUnidad: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) {
    this.IdUnidad= this.IdDepartamentSource.asObservable();
  }


  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "unidades", { headers: headers});
  }

  addDepartament(departament: Departament){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "unidades", departament, { headers: headers});
  }

  changeDepartamentId(IdUnidad: number){
    this.IdDepartamentSource.next(IdUnidad);
  }

  getDepartament(IdUnidad: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}unidades/${IdUnidad}`, { headers: headers});
  }

  editDepartament(id: number, departament: Departament){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}unidades/${id}`, departament, { headers: headers});
  }
}
