import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Assignment } from 'src/app/models/assignment';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


const API_URL = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  assignmentList: any;

  IdAsignacionSource = new  BehaviorSubject<number>(0);
  IdAsignacion: any;

  constructor(
    private clienteHttp: HttpClient,
    private userService: AuthService
  ) { 
    this.IdAsignacion= this.IdAsignacionSource.asObservable();
  }

  showAll(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.get(API_URL + "asignaciones", { headers: headers});
  }

  addAssignment(assignment: Assignment){    
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.userService.getToken()}`)
    return this.clienteHttp.post(API_URL + "asignaciones", assignment, { headers: headers});
  }

}
