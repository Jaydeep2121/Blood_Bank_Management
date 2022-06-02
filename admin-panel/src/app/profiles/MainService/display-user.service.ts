import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserServiceService } from '../users/services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayUserService {
  constructor(private serv:UserServiceService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    return this.serv.getUser();
  }
}
