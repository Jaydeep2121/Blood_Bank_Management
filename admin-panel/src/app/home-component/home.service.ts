import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { emitters } from '../emitters/emitters';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  message = '';
  constructor(
    private http: HttpClient,
    private cookiser: CookieService,
    private router: Router
  ) {}
  isAuthenticate() {
    if (this.cookiser.get('jwt').length === 0) {
      this.router.navigate(['/login']);
      return;
    }
    this.http.get('api/auth-admin', { withCredentials: true }).subscribe(
      (res: any) => {
        this.message = 'Welcome ' + res.name;
        emitters.authEmitter.emit(true);
      },
      (err) => emitters.authEmitter.emit(false)
    );
  }
}
