import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home-component/home.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(private homeSer: HomeService,public router: Router) {}

  ngOnInit(): void {
    this.homeSer.isAuthenticate();
  }
}
