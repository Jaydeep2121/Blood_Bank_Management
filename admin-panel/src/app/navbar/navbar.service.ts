import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { emitters } from '../emitters/emitters';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor(private http: HttpClient, private router: Router) {}
  async logOut() {
    const result = await Swal.fire({
      title: 'Are you leaving?',
      text: 'Are you sure want to log out? All your unsaved data will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#20c997',
      cancelButtonColor: '#df4759',
      confirmButtonText: 'Yes',
    });
    if (result.isConfirmed) {
      this.http.post('api/logout', { withCredentials: true }).subscribe(() => {
        Swal.fire('LoggedOut!', 'You have been loggedOut.', 'success');
        emitters.authEmitter.emit(false);
        this.router.navigate(['/login']);
      });
    }
  }
}
