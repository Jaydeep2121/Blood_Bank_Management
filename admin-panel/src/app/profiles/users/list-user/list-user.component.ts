import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Double } from '@syncfusion/ej2-angular-charts';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { UserServiceService } from '../services/user-service.service';

export interface User{
  name :string;
  mobile: Double;
  email: string;
  password:string;
  imageUrl:string;
  blood_group:string;
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  @ViewChild(AngularMaterialModule) paginator: MatPaginator;
  @ViewChild(AngularMaterialModule) sort: MatSort;

  // Important objects
  MyDataSource: any;
  employeeList: User[];
  displayedColumns: string[] = ['name','mobile', 'email', 'password','imageUrl','blood_group', 'action'];

  constructor(private service: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers()
  }
  // To Get List Of Users
  getUsers() {
  this.service
  .getUser()
  .subscribe((data: User[]) => {
  this.MyDataSource = new MatTableDataSource();
  this.MyDataSource.data = data;
  this.MyDataSource.paginator = this.paginator;
  this.MyDataSource.sort = this.sort;
  });
  }
}
