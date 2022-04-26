import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  constructor(private serv: LoginServiceService) {}
  ngOnInit(): void {}
  LoginAdmin(form: NgForm) {
    this.serv.LoginAdmin(form);
  }
}
