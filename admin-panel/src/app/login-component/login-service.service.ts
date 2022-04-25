import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }
  LoginAdmin(Myform:any){
      this.http.post("api/admin/login",
                   Myform.value,{withCredentials:true}).
                   subscribe(val=>{
                     this.router.navigate(['/'])
                     console.log(val)
                    });
  }
}
