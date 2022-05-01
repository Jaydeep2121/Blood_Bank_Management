import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

export interface User {
  name: string;
  email: string;
  imageUrl: string;
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  MyDataSource: any;
  userList: User[];
  displayedColumns: string[] = ['Name', 'Email', 'imageUrl', 'action'];

  constructor(private serv: UserServiceService, private router: Router) { }
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.serv.getUser().subscribe((data: any) => {
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  // To Edit Employee
  editUser(userid: string) {
    this.router.navigate([`/Crud/edit/${userid}`]);
  }
  deleteEmployee(userid: string){
    console.log(userid);
  }
  // Search specific result
  filterUser(searchstring: string) {
    searchstring = searchstring.trim();
    searchstring = searchstring.toLowerCase();
    this.MyDataSource.filter = searchstring;
  }
}
