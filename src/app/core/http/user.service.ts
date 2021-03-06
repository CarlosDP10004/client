import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario, UsuarioPermission } from 'src/app/models/user';
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

  addUserPermission(user: UsuarioPermission){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "usuariosPermisos", user, { headers: headers});
  }

  editUser(id: number, user: Usuario){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}usuarios/${id}`, user, { headers: headers});
  }

  editUserPermission(id: number, user: UsuarioPermission){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}usuariosPermisos/${id}`, user, { headers: headers});
  }

  getUser(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}usuarios/${id}`, { headers: headers});
  }


  changeUsuarioId(IdUsuario: number){
    this.IdUsuarioSource.next(IdUsuario);
  }

  changeStatusUser(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}usuarios/changeStatus/${id}`, { headers: headers});
  }

  getEmployees(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}empleados`, { headers: headers});
  }

  getPermisosByUser(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}permisosUsuario/${id}`, { headers: headers})
  }

  getRolesByUser(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}rolesUsuario/${id}`, { headers: headers})
  }


  getUsersFromAD(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}usuariosAD`, { headers: headers})
  }

  getPermissionsOnApp(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}getPermission`, { headers: headers})
  }


}
