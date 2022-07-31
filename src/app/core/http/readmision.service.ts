import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class ReadmisionService {

  readmisionList: any;

  IdReadmisionSource = new  BehaviorSubject<number>(0);
  IdReadmision: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) {
    this.IdReadmision= this.IdReadmisionSource.asObservable();
  }


  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "readmision", { headers: headers});
  }

  editReadmision(id: number, body: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}readmision/${id}`, body, { headers: headers});
  }

  changeReadmisionId(IdCuenta: number){
    this.IdReadmisionSource.next(IdCuenta);
  }
}
