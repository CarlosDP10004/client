import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Provider } from 'src/app/models/provider';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  providerList: any;
  provider: Provider;

  IdProviderSource = new  BehaviorSubject<number>(0);
  IdProveedor: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdProveedor= this.IdProviderSource.asObservable();
  }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "proveedores", { headers: headers});
  }

  addProvider(provider: Provider){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "proveedores", provider, { headers: headers});
  }

  changeProviderId(IdProveedor: number){
    this.IdProviderSource.next(IdProveedor);
  }

  getProvider(IdProveedor: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}proveedores/${IdProveedor}`, { headers: headers});
  }

  editProvider(id: number, provider: Provider){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}proveedores/${id}`, provider, { headers: headers});
  }
}
