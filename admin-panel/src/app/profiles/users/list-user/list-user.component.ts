import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserServiceService } from '../services/user-service.service';
import * as _ from 'lodash';
import { ViewListProfileComponent } from './view-list-profile/view-list-profile.component';

export interface User {
  name: string;
  email: string;
  mobile: String;
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cdata: any;
  apiResponse:any = [];
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
    private serv: UserServiceService, 
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.serv.currval1.subscribe((val) => {
      if (val === 'load_ref') {
        this.getUser();
      }
    });
    this.getUser();
  }
  getUser() {
    this.serv.getUser().subscribe((data: any) => {
      this.apiResponse = data;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.cdata=data.length;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  filterData($event: any) {
    this.notFound='';
    if ($event.target.value.length === 0) {
      this.getUser();
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
  // To Edit User
  editUser(userid: string) {
    this.dialog.open(EditUserComponent);
    this.serv.change(userid);
  }
  deleteUser(userid: string) {
    this.serv.deleteUser(userid);
  }
  openDialog(userid: string) {
    this.serv.getUserref(userid).subscribe(val=>this.serv.setData(val));
    this.dialog.open(ViewListProfileComponent);
  }
}

