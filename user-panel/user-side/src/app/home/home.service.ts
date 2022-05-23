import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { emitters } from '../emitters/emitters';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient,private router:Router) {}
  isAuthenticate() {
    this.http.get('api/auth-user', { withCredentials: true }).subscribe(
      (res: any) => {
        emitters.authEmitter.emit(true);
      },
      (err) => {
        emitters.authEmitter.emit(false);
        this.router.navigate(['/home']);
      }
    );
  }
}
