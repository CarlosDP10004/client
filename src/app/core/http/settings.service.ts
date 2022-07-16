import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Setting } from 'src/app/models/setting';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  IdSettingSource = new  BehaviorSubject<number>(0);
  IdSetting: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdSetting= this.IdSettingSource.asObservable();
  }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "configuraciones", { headers: headers})
  }

  getSetting(id: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + `configuraciones/${id}`, { headers: headers})
  }

  editSetting(id: any, setting: Setting){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}configuraciones/${id}`, setting, { headers: headers});
  }

  editSettingImages(files: any, id: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}configuracionesImagenes/${id}`, files, { headers: headers});
  }

  getHome(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}mostrarHome`, { headers: headers});
  }

  getTitle(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}mostrarTitulo`, { headers: headers});
  }

  getLogo(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}mostrarLogo`, { headers: headers});
  }

  getBase(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}showBase`, { headers: headers});
  }

  
  
}
