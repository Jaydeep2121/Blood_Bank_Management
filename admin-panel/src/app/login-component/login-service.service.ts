import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  flag: boolean = true;
  constructor(private http: HttpClient, private router: Router) {}
  LoginAdmin(Myform: any) {
    return this.http.post<object>('api/admin/login', Myform, {
      withCredentials: true,
    });
  }
  showErrorDialog() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
}
