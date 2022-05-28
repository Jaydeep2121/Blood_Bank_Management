import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { CampService } from './camp.service';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.css'],
})
export class CampComponent implements OnInit {
  camplist: any;
  campItems: any;
  sort: string = 'asc';
  itemsPerPage = 3;
  totalItems: any;
  page: number = 1;
  idArr:any = [];
  constructor(
    private homSer: HomeService,
    private serv: CampService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.homSer.isAuthenticate();
    this.serv.getAppoint().subscribe(res=>this.idArr=[...res]);
    this.http
      .get<any>(`api/getCamp?page=${1}&size=${this.itemsPerPage}`)
      .subscribe((res) => {
        this.camplist = res;
        this.campItems = res.length;
      });
  }
  gty(page: any) {
    this.http
      .get<any>(`api/getCamp?page=${page}&size=${this.itemsPerPage}`)
      .subscribe((data: any) => {
        this.camplist = data;
        this.campItems = data.length;
      });
  }
  onApply(sortwith: string) {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
    this.serv.sortdata(this.sort, sortwith).subscribe((res) => {
      this.camplist = res;
    });
  }
  bookApp(id:string){
    this.serv.editUser(localStorage.getItem('eid')).subscribe((val) => {
      this.serv.addappit({camp_id:id,user_id:val._id});
    });
  }
}
