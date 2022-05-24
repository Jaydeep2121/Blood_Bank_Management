import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodAvaService {

  constructor(private http:HttpClient) { }
  getpage(page:any){
    return this.http.get<any>(`api/pagger/`+page)
  }
  
}
