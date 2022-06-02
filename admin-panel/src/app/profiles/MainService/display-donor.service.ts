import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DonorService } from '../donors/services/donor.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayDonorService {

  constructor(private serv:DonorService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    return this.serv.getappoint();
  }
}
