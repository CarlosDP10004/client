import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Maintenance } from 'src/app/models/maintenance';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  @Output() trigger: EventEmitter<any> = new EventEmitter();

  maintenanceList: any;
  maintenance: Maintenance;

  IdMaintenanceSource = new  BehaviorSubject<number>(0);
  IdMantenimiento: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdMantenimiento= this.IdMaintenanceSource.asObservable();
  }


  showAll(idAsset: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}mantenimientosLista/${idAsset}`, { headers: headers});
  }

  addMaintenance(maintenance: Maintenance){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(`${API_URL}mantenimientos`, maintenance, { headers: headers});
  }

  changeMaintenanceId(IdMantenimiento: number){
    this.IdMaintenanceSource.next(IdMantenimiento);
  }

  getMaintenance(IdMantenimiento: any){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(`${API_URL}mantenimientos/${IdMantenimiento}`, { headers: headers});
  }

  editMaintenance(id: number, maintenance: Maintenance){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.put(`${API_URL}mantenimientos/${id}`, maintenance, { headers: headers});
  }
}
