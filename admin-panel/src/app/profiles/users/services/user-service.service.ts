import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  public editDataDetails: string = '';
  private msgsor = new BehaviorSubject(this.editDataDetails);
  currval = this.msgsor.asObservable();
  change(id: string) {
    this.msgsor.next(id);
  }
  constructor(private http: HttpClient, private router: Router) {}
  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public setData(data: object) {
    this._data.next(data);
  }
  public getdata(): Observable<any> {
    return this._data.asObservable();
  }
  // To Get The List Of User
  getUser() {
    return this.http.get('api/getUsers');
  }
  //get blood group data
  getGroup() {
    return this.http.get('api/getGroups');
  }
  // To Create/Add New User
  addUser(body: any) {
    this.http.post('api/users', body).subscribe(() => {
      this.showDialog('User Data Has Been Saved');
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
  //
  UpdateUser(body: any) {
    this.http.patch('api/UpdateUser', body).subscribe(() => {
      this.showDialog('User Data Has Been Updated');
    });
  }
  // To Delete Any User
  async deleteUser(usrid: string) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
    if (result.isConfirmed) {
      this.http.get(`api/deleteUser/${usrid}`).subscribe(() => {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      });
    }
  }
  // To Get User Details For Single Record Using Id
  editUser(usrid: string): Observable<any> {
    return this.http.get<any>(`api/editUser/${usrid}`);
  }
  // To Get User Details For Single Record Using Id with ref
  getUserref(usrid: string): Observable<any> {
    return this.http.get<any>(`api/getUserRef/${usrid}`);
  }
}


