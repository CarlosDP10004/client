import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

    let request = req;

    if (!(token === null)) {      
      request = req.clone({
        setHeaders: {          
          authorization: `bearer ${ token }`
        }
      });
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
}
