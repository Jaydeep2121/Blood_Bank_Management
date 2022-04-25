import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { emitters } from '../emitters/emitters';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  message = '';
  constructor(
      private http: HttpClient, 
      private cookiser: CookieService,
      private router:Router) {}

  ngOnInit(): void {
    if (this.cookiser.get('jwt').length === 0) {
      this.router.navigate(['/login']);
      return;
    }
    this.http.get('api/auth-admin', { withCredentials: true }).subscribe(
      (res: any) => {
        this.message = 'Hi ' + res.name;  
        emitters.authEmitter.emit(true);
      },
      (err) => emitters.authEmitter.emit(false)
    );
  }
}
