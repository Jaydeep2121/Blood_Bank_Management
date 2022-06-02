import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from '../employees/services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayEmpService {

  constructor(private serv:EmployeeService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    return this.serv.getEmp();
  }
}
