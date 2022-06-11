import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    const token: string = this.authService.getToken();   
    const isExpired = new Date(localStorage.getItem('expires_in')).getTime(); 

    let request = req;

    if (!(token === null)) {      
      request = req.clone({
        setHeaders: {          
          authorization: `bearer ${ token }`
        }
      });
    }
    
    if(isExpired - new Date().getTime() <= 300000 && this.authService.getToken() != null){
      Swal.fire({
        title: 'Su sesión está a punto de expirar!!',
        text: "De clic en la opción extender para continuar logueado, o en cerrar sesión para salir del aplicativo",
        icon: 'warning',
        showCancelButton: true,      
        cancelButtonColor: '#c9a892',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cerrar sesión',
        confirmButtonText: 'Extender sesión'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.auxExpires();
          await this.refreshToken();
        }
        if(result.isDismissed){
          await this.authService.logout();
          this.router.navigateByUrl('/login');
        }        
      })
    }

    if(isExpired - new Date().getTime() <= 0 && this.authService.getToken() != null){
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }

    return next.handle(request).pipe(      
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          if(this.authService.isLogged){
            this.router.navigateByUrl('/Unauthorized');
          }else{
            this.router.navigateByUrl('/login');
          }
        }
        return throwError( err );
      })
    );
  }


  private refreshToken(){
    return new Promise((resolved, reject) => {      
      this.authService.refreshToken().subscribe(data=>{
        this.authService.saveToken(data);
        resolved(data);
    });
    });
  }

  private auxExpires(){
    let expireDate = new Date(
      new Date().getTime() + + 600000
    );   
    localStorage.setItem('expires_in', expireDate.toString());
  }
}
