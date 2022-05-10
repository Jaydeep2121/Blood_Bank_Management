import { Component, Input, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-view-list-profile',
  templateUrl: './view-list-profile.component.html',
  styleUrls: ['./view-list-profile.component.css'],
})
export class ViewListProfileComponent implements OnInit {
  displayStyle: string = '';
  name: string;
  email: string;
  mobile: string;
  gender:string;
  constructor(private serv: UserServiceService) {}
  ngOnInit(): void {
    this.serv.getdata().subscribe((data) => this.getUserByid(data));
  }
  getUserByid(val: any) {
    this.name = val['name'];
    this.email = val['email'];
    this.mobile = val['mobile'];
    this.gender = val['gender'];
  }
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
