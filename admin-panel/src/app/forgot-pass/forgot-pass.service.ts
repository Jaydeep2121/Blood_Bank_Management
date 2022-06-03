import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  constructor(private http: HttpClient,private router: Router) {}
  ForgetPassUser(Myform: any){
    this.http.post<any>('api/AdminforgetPass',Myform).subscribe(res=>{
      this.showSuccessDialog('New Password Sent to Your Registered Mail');
      this.router.navigate(['/login']);
    },(error)=>{
        this.showErrorDialog();
    })
  }
  showErrorDialog() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong! Please Enter Registered Email',
    });
  }
  showSuccessDialog(title: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
