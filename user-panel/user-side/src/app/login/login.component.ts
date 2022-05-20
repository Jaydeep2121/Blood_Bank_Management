import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      userEmail:new FormControl(null),
      userPass:new FormControl(null)  
    });
  }
  onSubmit(form:FormGroup){
    if(form.valid){
      console.log(form.value)
    }
  }
}
