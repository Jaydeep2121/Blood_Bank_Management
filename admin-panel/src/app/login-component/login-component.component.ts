import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginServiceService } from './login-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private serv:LoginServiceService) { }

  ngOnInit(): void {
    this.getdataFromApi();
  }
  LoginAdmin(form:NgForm){
    const userName=form.value.username;
    const password=form.value.password;
  }
  getdataFromApi(){
    this.serv.getData().subscribe((res)=>{
      console.log('response api :',res);
    },(err)=>{
      console.log('error is:',err);
    });
  }
}
