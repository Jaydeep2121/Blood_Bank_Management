import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  loginForm: FormGroup | any;
  title = 'material-login';
  constructor(
    private router:Router,
    private authgr: AuthGuard,
    private serv: LoginServiceService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
   }
   ngOnInit(): void {
    if (this.authgr.canActivate()) {
      this.router.navigate(['/']);
    }
  }
  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    this.serv.LoginAdmin(this.loginForm.value);
  }
}

