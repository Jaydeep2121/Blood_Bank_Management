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
  userId:string;
  page: number = 1;
  idArr:any = [];
  private Sub:Subscription;
  authenticated:boolean = false;
  constructor(
    private homSer: HomeService,
    private serv: CampService,
    private http: HttpClient,
    private webser:WebService
  ) {}

  ngOnInit(): void {
    this.webser.loadJsFile("../../assets/JsFiles/NavBar.js"); 
    this.homSer.isAuthenticate();
    this.Sub=emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
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
    if(!this.authenticated){
      this.webser.showErrorDialog();
    }
    this.serv.editUser(localStorage.getItem('eid')).subscribe((val) => {
      this.userId=val._id;
      this.serv.addappit({campfield:id,userfield:this.userId});
    });
  }
  ngOnDestroy(): void {
    this.Sub.unsubscribe();
  }
}
