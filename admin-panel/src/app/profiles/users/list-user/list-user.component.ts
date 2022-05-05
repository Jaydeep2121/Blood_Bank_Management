import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserServiceService } from '../services/user-service.service';

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

  MyDataSource: any;
  cdata:any;
  displayedColumns: string[] = ['Name', 'Email', 'Contact', 'action'];

  constructor(private serv: UserServiceService, 
              public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.serv.getUser().subscribe((data: any) => {
      this.cdata=data.length;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  // To Edit Employee
  editUser(userid: string) {
    this.dialog.open(EditUserComponent);
    this.serv.change(userid);
  }
  deleteUser(userid: string) {
    this.serv.deleteUser(userid);
  }
  // Search specific result
  filterUser(searchstring: string) {
    searchstring = searchstring.trim();
    searchstring = searchstring.toLowerCase();
    this.MyDataSource.filter = searchstring;
  }
}
