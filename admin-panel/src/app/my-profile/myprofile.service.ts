import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MyprofileService {
  constructor(private http: HttpClient) {}
  getadmin(): Observable<any> {
    return this.http.get<any>('api/getAdmin');
  }
  //
  updateAdminData(body: any) {
    this.http.patch('api/UpdateAdmin', body).subscribe((val) => {
      this.showDialog('Data Has Been Updated');
    });
  }
  showDialog(title: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
