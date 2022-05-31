import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Asset } from 'src/app/models/asset';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  assetList: any;

  IdActivoFijoSource = new  BehaviorSubject<number>(0);
  IdActivoFijo: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdActivoFijo= this.IdActivoFijoSource.asObservable();
  }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "activos", { headers: headers});
  }

  addAsset(asset: Asset){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "activos", asset, { headers: headers});
  }

  addPatent(asset: Asset){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "patentes", asset, { headers: headers});
  }

  addVehicle(asset: Asset){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "vehiculos", asset, { headers: headers});
  }

  getOrigen(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "origenes", { headers: headers});
  }

  getEstados(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "estados", { headers: headers});
  }

  getAsset(IdAsset: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}activos/${IdAsset}`,{ headers: headers})
  }

  editAsset(id: any, asset: Asset){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}activos/${id}`, asset, { headers: headers});
  }

  getAssetList(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}activosByEstado`, { headers: headers});
  }

  getTraceAsset(id: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}historialActivo/${id}`, { headers: headers});
  }

  getAssetToRequest(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}listaActivosSolicitud`, { headers: headers});    
  }
  
}
