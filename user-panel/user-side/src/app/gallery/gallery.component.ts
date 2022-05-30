import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
import { WebService } from '../web.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  constructor(private serv:HomeService,private webser:WebService) { }

  ngOnInit(): void {
    this.webser.loadJsFile("../../assets/JsFiles/NavBar.js"); 
    this.serv.isAuthenticate();
  }
}
