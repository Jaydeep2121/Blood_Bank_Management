import { Component,OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { emitters } from '../emitters/emitters';
import { Router } from '@angular/router';
import { NavService } from './nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit ,OnDestroy {
  private Sub:Subscription;
  authenticated:boolean = false;
  constructor(public route:Router,private navSer:NavService) { }

  ngOnInit(): void {
    this.Sub=emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
  donatenwClick(){
    this.route.navigate(['/camp']);
  }
  logOut() {
    this.navSer.logOut();
  }
  ngOnDestroy(): void {
    this.Sub.unsubscribe();
  }

}
