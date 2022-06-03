import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgetPassService } from './forget-pass.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private serv:ForgetPassService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ])
    });
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.serv.ForgetPassUser(this.loginForm.value);
    this.loginForm.reset();
  }
}
