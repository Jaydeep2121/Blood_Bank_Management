import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ForgotPassService } from './forgot-pass.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  loginForm: FormGroup | any;
  constructor(
    private serv:ForgotPassService,
    private authgr: AuthGuard,
    private router:Router
    ) 
  {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),])
    });
  }
  ngOnInit(): void {
    
  }
  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
    this.serv.ForgetPassUser(this.loginForm.value);
    this.loginForm.reset();
  }
}
