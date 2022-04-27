import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { emitters } from '../emitters/emitters';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit,OnDestroy {
  private Sub:Subscription;
  authenticated = false;
  constructor(private navSer: NavbarService) { }

  ngOnInit(): void {
    this.Sub=emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
  logOut() {
    this.navSer.logOut();
  }
  ngOnDestroy(): void {
    this.Sub.unsubscribe();
  }
}
