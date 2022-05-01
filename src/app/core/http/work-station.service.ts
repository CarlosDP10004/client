import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkStation } from 'src/app/models/work-station';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class WorkStationService {

  workStationList: any;
  workStation: WorkStation;

  IdPlazaSource = new  BehaviorSubject<number>(0);
  IdPlaza: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdPlaza= this.IdPlazaSource.asObservable();
  }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "plazas", { headers: headers});
  }

  addWorkStation(workStation: WorkStation){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "plazas", workStation, { headers: headers});
  }

  changeWorkStationId(IdPlaza: number){
    this.IdPlazaSource.next(IdPlaza);
  }

  getWorkStation(IdPlaza: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}plazas/${IdPlaza}`, { headers: headers});
  }

  editWorkStation(id: number, workStation: WorkStation){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}plazas/${id}`, workStation, { headers: headers});
  }

  changeStatusWorkStation(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}plazas/changeStatus/${id}`, { headers: headers});
  }

  getWorkStationByUnit(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}plazas/byUnidad/${id}`, { headers: headers});
  }

  getWorkStationWithOutAssignment(id: number){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}plazas/byUnidad/${id}`, { headers: headers});
  }
}
