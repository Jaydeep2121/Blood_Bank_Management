import { Component, OnInit } from '@angular/core';
import { MyprofileService } from '../myprofile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  name:string;
  email:string;
  mobile:string;
  displayStyle = 'none';
  imagPath: any;
  constructor(private proSer:MyprofileService) { }
  ngOnInit(): void {
    this.proSer.currval.subscribe((val:any)=>{
      this.name=val[0]['name'];
      this.email=val[0]['email'];
      this.mobile=val[0]['mobile'];
      this.imagPath = val[0].imageUrl[0].path;
    });
  }
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
