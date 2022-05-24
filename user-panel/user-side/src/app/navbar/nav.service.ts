import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { emitters } from '../emitters/emitters';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private http: HttpClient, private router: Router) {}
  logOut() {
      this.http.post('api/logout', { withCredentials: true }).subscribe(() => {
        emitters.authEmitter.emit(false);
        this.router.navigate(['/home']);
      });
  }
}
