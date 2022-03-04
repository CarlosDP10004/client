import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  brandList: any;
  brand: Brand;

  IdMarcaSource = new  BehaviorSubject<number>(0);
  IdMarca: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdMarca= this.IdMarcaSource.asObservable();
  }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "marcas", { headers: headers});
  }

  addBrand(brand: Brand){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "marcas", brand, { headers: headers});
  }

  changeBrandId(IdMarca: number){
    this.IdMarcaSource.next(IdMarca);
  }

  getBrand(IdMarca: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}marcas/${IdMarca}`, { headers: headers});
  }

  editBrand(id: number, brand: Brand){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}marcas/${id}`, brand, { headers: headers});
  }

  changeStatusBrand(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}marcas/changeStatus/${id}`, { headers: headers});
  }

  getBrandList(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}marcasLista`, { headers: headers});
  }
}
