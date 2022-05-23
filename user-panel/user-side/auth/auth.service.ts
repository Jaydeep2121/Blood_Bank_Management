import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private cookiser: CookieService) { }
  isloggedIn(){
    return !(this.cookiser.get('jwt').length === 0)
  }
}
