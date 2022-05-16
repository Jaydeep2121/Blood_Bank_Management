import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  public editDataDetails: string = '';
  private msgsor = new BehaviorSubject(this.editDataDetails);
  currval = this.msgsor.asObservable();
  chckflag: number;
  change(id: string) {
    this.msgsor.next(id);
  }
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
  //get bank data
  getbank(): Observable<any> {
    return this.http.get<any>('api/getbank');
  }
  //get group data
  getGroup(): Observable<any> {
    return this.http.get<any>('api/getGroups');
  }
  //get comp data
  getComp(): Observable<any> {
    return this.http.get<any>('api/getComp');
  }
  getReqApprl(): Observable<any> {
    return this.http.get<any>('api/getReqAppr');
  }
  // To Create/Add New stock
  AddStock(body: any) {
    this.http.post('api/CreStock', body).subscribe(() => {
      this.showDialog('Stock Data Has Been Saved');
    });
  }
  //update stockdata
  UpdateStock(body: any, sid: string) {
    this.http.patch(`api/UpdateStockdata/${sid}`, body).subscribe(() => {
      this.showDialog('Stock Data Has Been Updated');
    });
  }
  //update stockdata
  UpdateStockforreq(body: any, sid: string) {
    this.http.patch(`api/UpdateStockreqdata/${sid}`, body).subscribe(() => {
      this.showDialog('Stock Data Has Been Updated');
    });
  }
  //get stockRef data
  // To Get User Details For Single Record Using Id with ref
  getStockref(sid: string): Observable<any> {
    return this.http.get<any>(`api/getStockRef/${sid}`);
  }
  //get urequest data
  getUrefref(sid: string) {
    this.chckflag = 0;
    this.http.get<any>(`api/getUreqRef/${sid}`).subscribe((data) => {
      const compo = data['blood_compo']['_id'];
      const group = data['blood_group']['group'];
      const volume = data['volume'];
      this.getStock().subscribe((sdata) => {
        sdata.forEach((element: any) => {
          if (
            compo === element['blood_compo'] &&
            group === element['blood_group']['group'] &&
            volume <= element['volume']
          ) {
            this.chckflag = 1;
            this.UpdateStockforreq(
              {day_lt:0, quantity: element['volume'] - volume },
              element._id
            );
            this.approveAndInsert(sid,{data:'approve'});
            this.change1('load_ref');
          }
        });
        if (this.chckflag === 0) {
          this.stockDialog('There Is Not Enough Stock!');
        }
      });
    });
  }
  //update bloodbankdata
  updateBankData(body: any) {
    this.http.patch('api/UpdateBank', body).subscribe(() => {
      this.showDialog('Stock Data Has Been Updated');
    });
  }
  showDialog(title: string) {
    this.change1('load_ref');
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  stockDialog(title: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: title,
    });
  }
  onChange(event: MatTabChangeEvent) {
    if (event.tab.textLabel === 'STOCK') {
      this.router.navigate(['/Mdetails/storage/stock']);
    } else if (event.tab.textLabel === 'REQUEST') {
      this.router.navigate(['/Mdetails/storage/urequest']);
    }
  }
  //get stock data
  getStock(): Observable<any> {
    return this.http.get<any>('api/getStock');
  }
  getReqData(): Observable<any> {
    return this.http.get<any>('api/getReqData');
  }
  // To Get Stock Details For Single Record Using Id
  editStock(stockid: string): Observable<any> {
    return this.http.get<any>(`api/editStock/${stockid}`);
  }
  approveAndInsert(id: string, body: any) {
    this.http.post<any>(`api/AddReqStatus/${id}`, body).subscribe(() => {
      this.showDialog('Request Approved Successfully');
    });
  }
  // To Delete Any User
  async deleteStock(stockid: string) {
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
      this.http.get(`api/deleteStock/${stockid}`).subscribe(() => {
        this.change1('load_ref');
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      });
    }
  }
}
