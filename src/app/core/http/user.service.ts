import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userlist: any;
  user: Usuario;

  IdUsuarioSource = new  BehaviorSubject<number>(0);
  IdUsuario: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdUsuario= this.IdUsuarioSource.asObservable();
  }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "usuarios", { headers: headers});
  }

  addUser(user: Usuario){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "usuarios", user, { headers: headers});
  }

  editUser(id: number, user: Usuario){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}usuarios/${id}`, user, { headers: headers});
  }

  getUser(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}usuarios/${id}`, { headers: headers});
  }


  changeUsuarioId(IdUsuario: number){
    this.IdUsuarioSource.next(IdUsuario);
}
}
