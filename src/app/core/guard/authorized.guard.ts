import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../http/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(
    private userService: AuthService, 
    private router: Router
  ){

  }

  canActivate(): Observable<boolean>{

    var isAuthenticated = this.userService.isLogged;
        if (!isAuthenticated) {
            this.router.navigate(['/Unathorized']);
        }
        return isAuthenticated;
  }
  
}
