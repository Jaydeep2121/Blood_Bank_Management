import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-side';
  // show_el: boolean = false;
  // constructor(private router: Router) {
  //   router.events.forEach((event) => {
  //     if (event instanceof NavigationStart) {
  //       this.show_el = event.url !== "/login" && event.url !== "/regi" && event.url !== "/usr_profile";
  //     }
  //   });
  // }
}
