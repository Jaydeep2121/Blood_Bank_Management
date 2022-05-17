import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-emp-profile',
  templateUrl: './view-emp-profile.component.html',
  styleUrls: ['./view-emp-profile.component.css']
})
export class ViewEmpProfileComponent implements OnInit {

  displayStyle: string = '';
  name: string;
  email: string;
  mobile: string;
  gender:string;
  group:string;
  img:any;
  constructor(private serv: EmployeeService) {}
  ngOnInit(): void {
    this.serv.getdata().subscribe((data)=>this.getUserByid(data));
  }
  getUserByid(val: any) {
    this.name = val['name'];
    this.email = val['email'];
    this.mobile = val['mobile'];
    this.gender = val['gender'];
    this.group = val['blood_group']['group'];
    this.img = val.imageUrl[0].path;
  }
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }

}
