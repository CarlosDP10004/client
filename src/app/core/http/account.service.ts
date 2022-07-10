import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/models/account';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountList: any;
  account: Account;

  IdAccountSource = new  BehaviorSubject<number>(0);
  IdCuenta: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) {
    this.IdCuenta= this.IdAccountSource.asObservable();
   }

   showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "cuentas", { headers: headers});
  }

  addAccount(account: Account){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(`${API_URL}cuentas`, account, { headers: headers});
  }

  changeAccountId(IdCuenta: number){
    this.IdAccountSource.next(IdCuenta);
  }

  getAccount(IdCuenta: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}cuentas/${IdCuenta}`, { headers: headers});
  }

  editAccount(id: number, account: Account){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}cuentas/${id}`, account, { headers: headers});
  }

  changeStatusAccount(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}cuentas/changeStatus/${id}`, { headers: headers});
  }

  getAccountList(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}cuentasLista`, { headers: headers});
  }
}
