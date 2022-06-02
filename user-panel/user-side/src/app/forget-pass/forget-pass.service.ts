import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgetPassService {
  API_KEY:any='	AAAAQyJhVwk:APA91bHW_zDeZ6-lsYUj9diRDsHomHPM-a6PgA8VJ5NgVu155pnhg6K0pvkavfTHvh7L5kCZct8unCwDIstb_D8scxfRRS-Da4vSqWBhCpLO0rP_FDzH5b4SFgNJnmmiE2-YrWRrohkv'
  constructor(private http: HttpClient) {}
  ForgetPassUser(Myform: any) : Observable<any>  {
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.API_KEY}`,
      {
        requestType:'PASSWORD_RESET',
        email:Myform.userEmail
      }
    );
  }
}
