import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CampService {
  public editDataDetails1: string = '';
  private msgsor1 = new BehaviorSubject(this.editDataDetails1);
  currval1 = this.msgsor1.asObservable();
  change1(data: string) {
    this.msgsor1.next(data);
  }
  public editDataDetails: string = '';
  private msgsor = new BehaviorSubject(this.editDataDetails);
  currval = this.msgsor.asObservable();
  change(id: string) {
    this.msgsor.next(id);
  }
  constructor(private http: HttpClient) { }
  // To Get The List Of User
  getCamp(): Observable<any>  {
    return this.http.get<any>('api/getCamp');
  }
  searchData(data:string): Observable<any>  {
    return this.http.get<any>(`api/getSearch/${data}`);
  }
  // To Delete camp
  async deleteCamp(usrid: string) {
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
      this.http.get(`api/deleteCamp/${usrid}`).subscribe(() => {
        this.change1("load_ref");
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      });
    }
  }
  // To Create/Add New camp data
  addCamp(body: any) {
    this.http.post('api/addCamp', body).subscribe(() => {
      this.showDialog('Camp Data Has Been Saved');
    });
  }
  updCamp(body: any,usrid: string) {
    this.http.patch(`api/updCamp/${usrid}`, body).subscribe(() => {
      this.showDialog('Camp Data Has Been Updated');
    });
  }
  // To Get User Details For Single Record Using Id
  editUser(usrid: string): Observable<any> {
    return this.http.get<any>(`api/editCamp/${usrid}`);
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
}
