import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/details/details.service';

@Component({
  selector: 'app-viewcom',
  templateUrl: './viewcom.component.html',
  styleUrls: ['./viewcom.component.css'],
})
export class ViewcomComponent implements OnInit {
  displayStyle: string;
  compo: any;

  constructor(private serv: DetailsService) {}

  ngOnInit(): void {
    this.serv
      .getdata()
      .subscribe((data) => (this.compo = data['blood_compo']['component']));
  }
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
