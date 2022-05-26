import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { UserServiceService } from 'src/app/profiles/users/services/user-service.service';
import { EditCampComponent } from '../edit-camp/edit-camp.component';
import { CampService } from '../services/camp.service';

@Component({
  selector: 'app-list-camp',
  templateUrl: './list-camp.component.html',
  styleUrls: ['./list-camp.component.css']
})
export class ListCampComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cdata: any;
  apiResponse:any = [];
  MyDataSource: any;
  displayedColumns: string[] = [
    'position',
    'Date',
    'Time',
    'CampName',
    'Address',
    'ConductedBy',
    'OrganizedBy',
    'Action',
  ];
  constructor(
    private serv:UserServiceService,
    public dialog: MatDialog,
    private caSer:CampService) { }

  ngOnInit(): void {
    this.serv.currval1.subscribe((val) => {
      if (val === 'load_ref') {
        this.getCamp();
      }
    });
    this.getCamp();
  }

  getCamp() {
    this.caSer.getCamp().subscribe((data: any) => {
      this.apiResponse = data;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.cdata=data.length;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  // To Edit User
  editUser(userid: string) {
    this.dialog.open(EditCampComponent);
    this.serv.change(userid);
  }
  deleteUser(userid: string) {
    this.serv.deleteUser(userid);
  }
  // Search specific result
  filterData($event : any){
    this.MyDataSource.filter = $event.target.value;
  }
  onChange($event:any){
    let filteredData = _.filter(this.apiResponse,(item:any) =>{
      return item.gender.toLowerCase() ==  $event.value.toLowerCase();
    })
    this.MyDataSource = new MatTableDataSource(filteredData); 
  }

}
