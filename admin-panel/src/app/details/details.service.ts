import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  public editDataDetails: Object = '';
  private msgsor = new BehaviorSubject(this.editDataDetails);
  currval = this.msgsor.asObservable();
  change(val: Object) {
    this.msgsor.next(val);
  }
  constructor(private http: HttpClient) {}
  getbank(): Observable<any> {
    return this.http.get<any>('api/getbank');
  }
  updateBankData(body: any) {
    this.http.patch('api/UpdateBank', body).subscribe((val) => {
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
