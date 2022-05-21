import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisService } from './regis.service';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrls: ['./user-reg.component.css'],
})
export class UserRegComponent implements OnInit {
  regForm: FormGroup;
  constructor(private serv: RegisService) {}

  ngOnInit(): void {
    this.formData();
  }
  formData() {
    this.regForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      gender: new FormControl('', [Validators.required]),
      userPass: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        ),
      ]),
      userCont: new FormControl('', [
        Validators.required,
        Validators.pattern('^([9]{1})([234789]{1})([0-9]{8})$'),  
      ]),
    });
  }
  onSubmit() {
    if (!this.regForm.valid) {
      return;
    }
    // this.serv.RegiUser(this.loginForm.value);
  }
}
