import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images = [  
    { img: "../../assets/images/img1.png" },  
    { img: "../../assets/images/img2.png" },  
    { img: "../../assets/images/img3.png" },  
  ];
  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true,  
    "infinite": true  
  };   
  constructor(private serv:HomeService) { }

  ngOnInit(): void {
    this.serv.isAuthenticate();
  }

}
