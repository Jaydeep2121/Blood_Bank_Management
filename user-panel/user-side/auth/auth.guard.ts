import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public AuthSer: AuthService,
    private router: Router
    ) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.AuthSer.isloggedIn())return true;
      this.router.navigate(['/home']);
      return false;
  }
}
