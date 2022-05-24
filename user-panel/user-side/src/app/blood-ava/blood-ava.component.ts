import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { BloodAvaService } from './blood-ava.service';

@Component({
  selector: 'app-blood-ava',
  templateUrl: './blood-ava.component.html',
  styleUrls: ['./blood-ava.component.css']
})
export class BloodAvaComponent implements OnInit {
  stocklist!: any;
  page: number = 1;
  totalItems:any;
  itemsPerPage = 3;
  constructor(
    private serv:BloodAvaService,private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`api/getStock?page=${1}&size=${this.itemsPerPage}`).subscribe(res => {
      this.stocklist = res;
      this.totalItems = res.length;
    });
  }
  gty(page: any){
    this.http.get(`api/getStock?page=${page}&size=${this.itemsPerPage}`).subscribe((data: any) => {
      this.stocklist =  data;
      this.totalItems = data.length;
    });
  }
}
