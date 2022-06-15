import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';
import { HomeService } from '../home-component/home.service';
import { ApprlService } from './apprl.service';

@Component({
  selector: 'app-apprl',
  templateUrl: './apprl.component.html',
  styleUrls: ['./apprl.component.css'],
})
export class ApprlComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cdata: any;
  apiResponse: any = [];
  MyDataSource: any;
  displayedColumns: string[] = [
    'position',
    'Emp Name',
    'Emp Contact',
    'Volume',
    'Bl.Group',
    'Bl.Component',
  ];
  constructor(
    public dialog: MatDialog,
    private Ser: ApprlService,
    private homeSer: HomeService
  ) {}

  ngOnInit(): void {
    this.homeSer.isAuthenticate();
    this.getCamp();
  }

  getCamp() {
    this.Ser.getReqAprl().subscribe((data: any) => {
      this.apiResponse = data;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.cdata = data.length;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  // Search specific result
  filterData($event: any) {
    this.MyDataSource.filter = $event.target.value;
  }
  onChange($event: any) {
    let filteredData = _.filter(this.apiResponse, (item: any) => {
      return item.gender.toLowerCase() == $event.value.toLowerCase();
    });
    this.MyDataSource = new MatTableDataSource(filteredData);
  }
}
