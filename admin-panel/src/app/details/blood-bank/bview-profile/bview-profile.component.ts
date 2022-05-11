import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../details.service';

@Component({
  selector: 'app-bview-profile',
  templateUrl: './bview-profile.component.html',
  styleUrls: ['./bview-profile.component.css'],
})
export class BviewProfileComponent implements OnInit {
  name: string;
  timing: string;
  mobile: string;
  address: string;
  displayStyle = 'none';
  imagPath: any;
  constructor(private detSer: DetailsService) {}
  ngOnInit(): void {
    this.detSer.currval.subscribe((val: any) => {
      this.name = val[0]['name'];
      this.timing = val[0]['timing'];
      this.mobile = val[0]['contact'];
      this.address = val[0]['address'];
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
