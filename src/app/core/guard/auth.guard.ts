import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../http/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
      private userService: AuthService, 
      private router: Router
      ){}    

    canActivate(): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree 
    {
      return this.userService.isLogged.pipe(
        map( user =>{
          if(!user){
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
    }
}
