import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  postIdSource = new  BehaviorSubject<number>(0);
  postIdData: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) {
    this.postIdData= this.postIdSource.asObservable();
   }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "roles", { headers: headers})
  }

  getRol(Id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "roles?Id="+ Id, { headers: headers})
  }
}
