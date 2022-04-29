import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home-component/home.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(public homeSer: HomeService, public router: Router) {}
  ngOnInit(): void {
    this.homeSer.isAuthenticate();
  }
}
