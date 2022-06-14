import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public editDataDetails1: string = '';
  private msgsor1 = new BehaviorSubject(this.editDataDetails1);
  currval1 = this.msgsor1.asObservable();
  change1(data: string) {
    this.msgsor1.next(data);
  }
  constructor(private http:HttpClient) { }
  //get blood group data
  getGroup() {
    return this.http.get('api/getGroups');
  }
  // To Get The List Of campdata
  getCamp(): Observable<any>  {
    return this.http.get<any>('api/getCamp');
  }
  // To Get User Details For Single Record Using Id
  editUser(usrid: string): Observable<any> {
    return this.http.get<any>(`api/editUserByEmail/${usrid}`);
  }
  //get appointment data
  getAppoint(id:string): Observable<any> {
    return this.http.get<any>(`api/getappomt/${id}`);
  }
  getpatchAppoint(uid:string,cid:string): Observable<any> {
    return this.http.get<any>(`api/getpatchappomt/${uid}/${cid}`);
  }
  UpdateAppoint(uid:string,cid:string,body:any){
    this.http.post(`api/getupdateappomt/${uid}/${cid}`,body).subscribe((val)=>{
      this.showDialog('Appointment Has Been Updated');
    });
  }
  //update user data
  UpdateUser(body: any,usrid: string) {
    this.http.patch(`api/UpdateUser/${usrid}`, body).subscribe(() => {
      this.showDialog('User Data Has Been Updated');
    });
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
  async deletecamp(campid: string) {
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
      this.http.get(`api/deleteDonorByCamp/${campid}`).subscribe(() => {
        this.change1("load_ref");
        Swal.fire('Deleted!', 'Your Camp Appointment Has Been Cancelled.', 'success');
      });
    }
  }
}
