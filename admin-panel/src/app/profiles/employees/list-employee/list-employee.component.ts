import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { EmployeeService } from '../services/employee.service';
import { ViewEmpProfileComponent } from './view-emp-profile/view-emp-profile.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

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
    private serv: EmployeeService, 
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.serv.currval1.subscribe((val) => {
      if (val === 'load_ref') {
        this.getEmp();
      }
    });
    this.getEmp();
  }
  getEmp() {
    this.serv.getEmp().subscribe((data: any) => {
      this.apiResponse = data;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.cdata=data.length;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  // To Edit User
  editEmp(userid: string) {
    this.dialog.open(EditEmployeeComponent);
    this.serv.change(userid);
  }
  deleteEmp(userid: string) {
    this.serv.deleteEmp(userid);
  }
  // Search specific result
  filterData($event: any) {
    this.notFound='';
    if ($event.target.value.length === 0) {
      this.getEmp();
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
    this.serv.getEmpref(userid).subscribe(val=>this.serv.setData(val));
    this.dialog.open(ViewEmpProfileComponent);
  }

}
