import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Subscription } from 'rxjs';
import { HomeService } from '../home/home.service';
import { WebService } from '../web.service';
import { CampService } from './camp.service';
import { emitters } from '../emitters/emitters';
import { forbiddenWeightValidator } from '../public/_helpers/weight-validator';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.css'],
})
export class CampComponent implements OnInit {
  campid: string = '';
  form: FormGroup;
  camplist: any;
  campItems: any;
  sort: string = 'asc';
  itemsPerPage = 3;
  totalItems: any;
  userId: string;
  page: number = 1;
  idArr: any = [];
  maxDate:any;
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
    this.Sub = emitters.authEmitter.subscribe(
      (auth: boolean) => (this.authenticated = auth)
    );
    this.serv
      .editUser(localStorage.getItem('eid'))
      .subscribe((val) => (this.userId = val._id));
    this.serv.getAppoint().subscribe((res) => (this.idArr = [...res]));
    this.getdata();
    this.formdata();
    // document.getElementById('modalid').click();
    this.futureDateDisable();
  }
  futureDateDisable() {
    var date:any = new Date();
    var todayDate:any=date.getDate();
    var month:any=date.getMonth()+1;
    var year:any=date.getFullYear();
    if (todayDate<10) {
      todayDate = '0'+todayDate;
    }
    if (month<10) {
      month = '0'+month;
    }
    this.maxDate=year + "-" + month + "-" + todayDate;
  }
  formdata() {
    this.form = new FormGroup({
      weight: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        forbiddenWeightValidator(new RegExp('^(4[^0-4]|[5-9][0-9]|[1-9][0-9][0-9])+$'))
      ]),
      hemog: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        forbiddenWeightValidator(new RegExp('^(1[^0-2]|[2-9][0-9])+$'))
      ]),
      last_donate: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]), 
    });
  }
  ageInMilliseconds:Number;
  addEligForm() {
    console.log("eligiblity form add");
    console.log(this.form.value);

    this.ageInMilliseconds = new Date().valueOf() - new Date(this.form.value.dob).valueOf();  
    console.log("year : " , Math.floor(+this.ageInMilliseconds/1000/60/60/24/365));
    // ageInMilliseconds:Date = new Date() - new Date(this.form.value.dob);
    // console.log(Math.floor(this.ageInMilliseconds/1000/60/60/24/365));

    // this.serv.editUser(localStorage.getItem('eid')).subscribe((val: any) => {
    //   if (this.campid != '') {
    //     this.serv.AddEli(this.form.value, val._id, this.campid);
    //     this.form.reset();
    //   }
    // });
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
      return;
    }
    this.campid = id;
    document.getElementById('modalidform').click();
  }
  ngOnDestroy(): void {
    this.Sub.unsubscribe();
  }
}
