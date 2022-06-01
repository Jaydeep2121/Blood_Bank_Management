import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../home/home.service';
import { WebService } from '../web.service';
import { CampService } from './camp.service';
import { emitters } from '../emitters/emitters';

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
  userId: string;
  page: number = 1;
  idArr: any = [];
  private Sub: Subscription;
  authenticated: boolean = false;
  notFound: string;
  constructor(
    private homSer: HomeService,
    private serv: CampService,
    private http: HttpClient,
    private webser: WebService
  ) {}

  ngOnInit(): void {
    this.webser.loadJsFile('../../assets/JsFiles/NavBar.js');
    this.homSer.isAuthenticate();
    this.Sub = emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.serv.getAppoint().subscribe((res) => (this.idArr = [...res]));
    this.getdata();
  }
  getdata() {
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
  filterData($event: any) {
    this.notFound = '';
    if ($event.target.value.length === 0) {
      this.getdata();
    } else if ($event.target.value.length > 0) {
      this.serv.searchData($event.target.value).subscribe(
        (table_data) => {
          console.log(table_data);
          this.camplist = table_data.data;
          this.campItems = table_data.length;
        },
        (err) => {
          this.notFound = 'not found';
        }
      );
    }
  }
  bookApp(id: string) {
    if (!this.authenticated) {
      this.webser.showErrorDialog();
    }
    this.serv.editUser(localStorage.getItem('eid')).subscribe((val) => {
      this.userId = val._id;
      this.serv.addappit({ campfield: id, userfield: this.userId });
    });
  }
  ngOnDestroy(): void {
    this.Sub.unsubscribe();
  }
}
