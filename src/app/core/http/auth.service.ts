import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserResponse } from 'src/app/models/user';


const API_URL = environment.api_url;
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = new BehaviorSubject<boolean>(false);

  IdProfileSource = new  BehaviorSubject<number>(0);
  IdProfile: any;

  constructor(
    private http: HttpClient
  ) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.logged.asObservable();
  }

  public login(user: User): Observable<any>{
    return this.http.post<UserResponse>(API_URL + 'login', user)
    .pipe(
      map((res: UserResponse) =>{
          this.saveToken(res.access_token);
          this.logged.next(true);
          return res;
        }),
        catchError((err)=> this.errorHandler(err))
    );
  }

  private saveToken(access_token: string):void{
    localStorage.setItem('access_token', access_token)
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  private checkToken():void{
    const userToken = localStorage.getItem('access_token');
    const isExpired = helper.isTokenExpired(userToken);
    //console.log(isExpired);
    if(isExpired){
      this.logout();
    }else{
      this.logged.next(true);
    }
  }

  getPermission(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.getToken()}`)
    return this.http.get(`${API_URL}getPermission`, { headers: headers});
  }

  logout():Observable<any>{
    localStorage.removeItem('access_token');
    this.logged.next(false);
    return this.http.post(API_URL + 'logout', localStorage.getItem);
    
  } 

  me(){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.getToken()}`)
    return this.http.get(`${API_URL}profile`, { headers: headers});
  }

  profile($id){
    const headers = new HttpHeaders().set('Authorization', `bearer ${this.getToken()}`)
    return this.http.get(`${API_URL}empleados/${$id}`, { headers: headers});
  }


  private errorHandler(err):Observable<never>{
    let errorMessage = 'An error ocurred retrieving data';
    if(err){
      errorMessage = err.error.message;
    }
    return throwError(errorMessage);
  }
}
