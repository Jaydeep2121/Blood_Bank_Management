import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DonorService } from '../services/donor.service';
import * as _ from 'lodash';
import { ViewListDonorComponent } from './view-list-donor/view-list-donor.component';

@Component({
  selector: 'app-list-donor',
  templateUrl: './list-donor.component.html',
  styleUrls: ['./list-donor.component.css']
})
export class ListDonorComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cdata: any;
  apiResponse:any = [];
  userArr:any=[];
  MyDataSource: any;
  displayedColumns: string[] = [
    'position',
    'Name',
    'Gender',
    'Email',
    'Contact',
    'action',
  ];
  notFound: string;

  constructor(
    private serv: DonorService, 
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.serv.currval1.subscribe((val) => {
      if (val === 'load_ref') {
        this.getDonor();
      }
    });
    this.getDonor();
  }
  getDonor() {
    this.serv.getappoint().subscribe((data: any) => {
      this.userArr=[];
      data.map((ele:any)=>this.userArr[this.userArr.length]=ele.refuser);
      this.apiResponse = this.userArr;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = this.userArr;      
      this.cdata=this.userArr.length;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  
  deleteDonor(userid: string) {
    this.serv.deleteDonor(userid);
  }
  filterData($event: any) {
    this.notFound='';
    if ($event.target.value.length === 0) {
      this.getDonor();
    } else if ($event.target.value.length > 0) {
      this.serv.searchData($event.target.value).subscribe(
        (table_data) => {
          this.MyDataSource = new MatTableDataSource(table_data);
          this.MyDataSource = this.MyDataSource.filteredData.data;
        },
        (err) => {
          this.notFound = 'not found';
        }
      );
    }
  }
  openDialog(userid: string) {
    this.serv.getDonorref(userid).subscribe(val=>this.serv.setData(val));
    this.dialog.open(ViewListDonorComponent);
  }
}
