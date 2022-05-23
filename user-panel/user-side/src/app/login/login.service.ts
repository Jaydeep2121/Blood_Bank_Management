import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public editDataDetails: string = '';
  private msgsor = new BehaviorSubject(this.editDataDetails);
  currval = this.msgsor.asObservable();
  change(id: string) {
    this.msgsor.next(id);
  }
  constructor(private http: HttpClient, private router: Router) {}
  LoginUser(Myform: any) {
    this.http
      .post<any>('api/user/login', Myform, { withCredentials: true })
      .subscribe(
        () => {
          this.change(Myform.userEmail);
          this.router.navigate(['/home']);
        },
        (err) => {
          this.showErrorDialog();
        }
      );
  }
  showErrorDialog() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
}
