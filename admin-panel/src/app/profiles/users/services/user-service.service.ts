import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}
  // Main api url to call api
  uri = 'http://localhost:4000/employees';

  // To Get The List Of Employee
  getUser() {
    return this.http.get('api/getUsers');
  }
  //get blood group data
  getGroup(){
    return this.http.get('api/getGroups');
  }

  // To Create/Add New User
  addUser(body: any):Observable<any> {
    return this.http.post<any>('api/users', body);
  }

  // To Get Employee Details For Single Record Using Id
  getEmployeeById(empid: string) {
    return this.http.get(`${this.uri}/editEmployee/${empid}`);
  }

  // To Updated Specific Employee
  updateEmployee(id: string, body: any) {
    return this.http.post(`${this.uri}/updateEmployee/${id}`, body);
  }


  // To Delete Any Employee
  deleteEmployee(empid: string) {
    return this.http.get(`${this.uri}/deleteEmployee/${empid}`);
  }
}
