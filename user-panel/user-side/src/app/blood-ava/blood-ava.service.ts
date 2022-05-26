import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BloodAvaService {

  constructor(private http:HttpClient) { }
  sortdata(sortby:any,sortwith:any){
    return this.http.get<any>(`api/sort/`+sortby+`/`+sortwith)
  }
  //get group data
  getGroup(): Observable<any> {
    return this.http.get<any>('api/getGroups');
  }
  //get comp data
  getComp(): Observable<any> {
    return this.http.get<any>('api/getComp');
  }
  // To Create/Add New stock
  AddRequest(body: any) {
    this.http.post('api/CreRequest', body).subscribe(() => {
      this.showDialog('Request Done');
    });
  }
  // To Get User Details For Single Record Using Id
  editUser(usrid: string): Observable<any> {
    return this.http.get<any>(`api/editUserByEmail/${usrid}`);
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
