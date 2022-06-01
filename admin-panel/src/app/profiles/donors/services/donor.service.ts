import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class DonorService {
  public editDataDetails1: string = '';
  private msgsor1 = new BehaviorSubject(this.editDataDetails1);
  currval1 = this.msgsor1.asObservable();
  change1(data: string) {
    this.msgsor1.next(data);
  }
  constructor(private http: HttpClient, private router: Router) {}
  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public setData(data: object) {
    this._data.next(data);
  }
  public getdata(): Observable<any> {
    return this._data.asObservable();
  }
  getappoint(): Observable<any> {
    return this.http.get<any>('api/getDonorAp');
  }
  GetCamp(): Observable<any> {
    return this.http.get<any>('api/getCamp');
  }
  GetUser(): Observable<any> {
    return this.http.get<any>('api/getUsers');
  }
  searchData(data:string): Observable<any>  {
    return this.http.get<any>(`api/getDonorSearch/${data}`);
  }
  AddApp(body:any){
    this.http.post<any>('api/addApp',body).subscribe(() => {
      this.showDialog('Appointment Added!!');
    });
  }
  // To Get User Details For Single Record Using Id with ref
  getDonorref(usrid: string): Observable<any> {
    return this.http.get<any>(`api/getAppRef/${usrid}`);
  }
  showDialog(title: string) {
    this.change1("load_ref");
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  // To Delete Any User
  async deleteDonor(usrid: string) {
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
      this.http.get(`api/deleteDonor/${usrid}`).subscribe(() => {
        this.change1("load_ref");
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      });
    }
  }
}


