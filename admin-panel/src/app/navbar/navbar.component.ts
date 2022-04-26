import { Component, OnInit } from '@angular/core';
import { emitters } from '../emitters/emitters';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authenticated = false;
  constructor(public navSer: NavbarService) { }

  ngOnInit(): void {
    emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }
  async logOut() {
    await this.navSer.logOut();
  }
}
