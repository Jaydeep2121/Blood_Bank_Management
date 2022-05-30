import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprlService {

  constructor(private http: HttpClient) { }
  // To Get The List Of data
  getReqAprl(): Observable<any>  {
    return this.http.get<any>('api/getApprvl');
  }
}
