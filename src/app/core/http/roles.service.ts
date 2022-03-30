import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  IdRoleSource = new  BehaviorSubject<number>(0);
  IdRol: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) {
    this.IdRol= this.IdRoleSource.asObservable();
   }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "roles", { headers: headers})
  }

  getRol(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + `roles/${id}`, { headers: headers})
  }

  addRole(role: Role){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "roles", role, { headers: headers});
  }

  getPermisos(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "permisos", { headers: headers})
  }

  getPermisosByRol(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}permisosRoles/${id}`, { headers: headers})
  }

  changeRolId(IdRol: number){
    this.IdRoleSource.next(IdRol);
  }

  editRole(id: number, rol: Role){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}roles/${id}`, rol, { headers: headers});
  }
}
