import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
    
  constructor(private router: Router,
              private serv: LoginServiceService,
              private authgr:AuthGuard) {}
  ngOnInit(): void {
    // if (this.authgr.canActivate()) {
    //   this.router.navigate(['/']);
    // }
  }
  LoginAdmin(form: NgForm) {
    this.serv.LoginAdmin(form);
  }
}
function canActivate() {
  throw new Error('Function not implemented.');
}

