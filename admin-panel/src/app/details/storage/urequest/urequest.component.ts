import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DetailsService } from '../../details.service';
import * as _ from 'lodash';
import { ViewcomComponent } from '../stock/viewcom/viewcom.component';

@Component({
  selector: 'app-urequest',
  templateUrl: './urequest.component.html',
  styleUrls: ['./urequest.component.css'],
})
export class UrequestComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cdata: any;
  GroupArray: any = [];
  StatusArray: any = [];
  apiResponse: any = [];
  MyDataSource: any;
  displayedColumns: string[] = [
    'position',
    'Volume',
    'User',
    'Blood Group',
    'Blood Compo.',
    'action',
  ];

  constructor(private serv: DetailsService, public dialog: MatDialog) {
    this.serv.currval1.subscribe((val) => {
      if (val === 'load_ref') {
        this.getStock();
      }
    });
  }
  ngOnInit(): void {
    this.serv.getReqApprl().subscribe((data) => (this.StatusArray = [...data]));
    this.serv
      .getGroup()
      .subscribe((data: any) => (this.GroupArray = [...data]));
    this.getStock();
  }
  getStock() {
    this.serv.getReqData().subscribe((data: any) => {
      this.apiResponse = data;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.cdata = data.length;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }

  opendataDialog(userid: string) {
    this.serv.getStockref(userid).subscribe((val) => this.serv.setData(val));
    this.dialog.open(ViewcomComponent);
  }
  // To Edit Stock
  approvebtn(id: string) {
    this.serv.getUrefref(id);
  }
  deleteStock(stockid: string) {
    this.serv.deleteStock(stockid);
  }
  onChange($event: any) {
    let filteredData = _.filter(this.apiResponse, (item: any) => {
      return (
        item.blood_group['group'].toLowerCase() == $event.value.toLowerCase()
      );
    });
    this.MyDataSource = new MatTableDataSource(filteredData);
  }
}
