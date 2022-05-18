import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  nav: any;
  dropdown: any;
  dropdownToggle: any;
  navToggle: any;

  constructor() {}

  ngOnInit(): void {
    this.nav = document.querySelector('nav');
    this.dropdown = this.nav.querySelector('.dropdown');
    this.dropdownToggle = this.nav.querySelector(
      "[data-action='dropdown-toggle']"
    );
    this.navToggle = this.nav.querySelector("[data-action='nav-toggle']");
  }
  ondropClick() {
    this.dropdown.classList.contains('show')
      ? this.dropdown.classList.remove('show')
      : this.dropdown.classList.add('show');
  }

  OnNavToggle() {
    this.nav.classList.contains('opened')
      ? this.nav.classList.remove('opened')
      : this.nav.classList.add('opened');
  }
}
