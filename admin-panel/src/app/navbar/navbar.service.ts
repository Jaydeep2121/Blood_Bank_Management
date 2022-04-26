import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  authnav=false;
  constructor(private http: HttpClient, private router: Router) {}
  logOut() {
    Swal.fire({
      title: 'Are you leaving?',
      text: 'Are you sure want to log out? All your unsaved data will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#20c997',
      cancelButtonColor: '#df4759',
      confirmButtonText: 'Yes',
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire('LoggedOut!', 'You have been loggedOut.', 'success');
        this.http
          .post('api/logout', { withCredentials: true })
          .subscribe(() => {
            this.authnav=true;
            this.router.navigate(['/login']);
          });
      }
    });
  }
}
