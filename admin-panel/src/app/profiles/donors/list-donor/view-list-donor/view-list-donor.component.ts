import { Component, OnInit } from '@angular/core';
import { DonorService } from '../../services/donor.service';

@Component({
  selector: 'app-view-list-donor',
  templateUrl: './view-list-donor.component.html',
  styleUrls: ['./view-list-donor.component.css']
})
export class ViewListDonorComponent implements OnInit {
  displayStyle: string = '';
  name: string;
  email: string;
  mobile: string;
  gender:string;
  group:string;
  img:any;
  constructor(private serv: DonorService) {}
  ngOnInit(): void {
    this.serv.getdata().subscribe((data)=>{
      console.log(data);
      this.getDonorByid(data)
    });
  }
  getDonorByid(val: any) {
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
