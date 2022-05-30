import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CampService {
  constructor(private http:HttpClient) {  }
  sortdata(sortby:any,sortwith:any){
    return this.http.get<any>(`api/Campsort/`+sortby+`/`+sortwith)
  }
  // To Get User Details For Single Record Using Id
  editUser(usrid: string): Observable<any> {
    return this.http.get<any>(`api/editUserByEmail/${usrid}`);
  }
  //get appointment data
  getAppoint(): Observable<any> {
    return this.http.get<any>('api/getappomt');
  }
  // Book and add appointment
  async addappit(body: object) {
    const result = await Swal.fire({
      title: 'Are you sure you want to book Appointment?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Book it!',
    });
    if (result.isConfirmed) {
      this.http.post<any>('api/addApp',body).subscribe(() => {
        Swal.fire('Booked!', 'Your file has been Booked', 'success');
      });
    }
  }
}
