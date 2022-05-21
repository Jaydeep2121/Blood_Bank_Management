import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegisService {

  constructor(private http:HttpClient) { }
  // To Create/Add New User
  RegiUser(body: any){
    this.http.post<any>('api/users', body).subscribe(() => {
      this.showDialog('Your Registration Done');
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
