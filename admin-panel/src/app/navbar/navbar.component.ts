import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { emitters } from '../emitters/emitters';
import { Router } from '@angular/router';
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authenticated=false;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
    emitters.authEmitter.subscribe(
      (auth:boolean)=>{
        this.authenticated=auth;
      }
    );
  }
  logOut(){
    this.http.post(
      "api/logout",{withCredentials:true}).
       subscribe(()=>{
         this.authenticated=false;
         this.router.navigate(['/']);
      });
  }
}
