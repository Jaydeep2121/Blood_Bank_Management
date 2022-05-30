import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { WebService } from '../web.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private serv:HomeService,private webser:WebService) { }

  ngOnInit(): void {
    this.webser.loadJsFile("../../assets/JsFiles/NavBar.js"); 
    this.serv.isAuthenticate();
  }

}
