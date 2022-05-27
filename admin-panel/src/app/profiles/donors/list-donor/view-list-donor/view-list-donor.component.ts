import { Component, OnInit } from '@angular/core';
import { DonorService } from '../../services/donor.service';

@Component({
  selector: 'app-view-list-donor',
  templateUrl: './view-list-donor.component.html',
  styleUrls: ['./view-list-donor.component.css']
})
export class ViewListDonorComponent implements OnInit {
  displayStyle: string = '';
  date:string;
  time:string;
  campname: string;
  address: string;
  img:string;
  constructor(private serv: DonorService) {}
  ngOnInit(): void {
    this.serv.getdata().subscribe((data)=>{
      this.getDonorByid(data)
    });
  }
  getDonorByid(val: any) {
    this.date=val['refcamp']['date'];
    this.time=val['refcamp']['time'];
    this.campname=val['refcamp']['camp_name'].toLowerCase();
    this.address=val['refcamp']['address'].toLowerCase();
    this.img = val['refuser']['imageUrl'][0].path;
  }
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }

}
