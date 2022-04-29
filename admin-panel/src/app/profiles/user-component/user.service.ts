import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Main api url to call api
  uri = 'http://localhost:4000/employees';
  constructor(private http: HttpClient) {}
  // To Get The List Of Employee
  getEmployees() {
    return this.http.get(`${this.uri}`);
  }

  // To Get Employee Details For Single Record Using Id
  getEmployeeById(usrid:string) {
    return this.http.get(`${this.uri}/editUser/${usrid}`);
  }

  // To Updated Specific Employee
  updateEmployee(id:string, body:any) {
    return this.http.post(`${this.uri}/updateUser/${id}`, body);
  }

  // To Create/Add New Employee
  addEmployee(body:any) {
    return this.http.post(`${this.uri}/addUser`, body);
  }

  // To Delete Any user
  deleteEmployee(usrid:string) {
    return this.http.get(`${this.uri}/deleteUser/${usrid}`);
  }
}
