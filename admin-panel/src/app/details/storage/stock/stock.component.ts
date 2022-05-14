import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DetailsService } from '../../details.service';
import * as _ from 'lodash';
import { EditStockComponent } from './edit-stock/edit-stock.component';
import { AddStockComponent } from './add-stock/add-stock.component';
import { ViewcomComponent } from './viewcom/viewcom.component';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  cdata: any;
  GroupArray: any = [];
  apiResponse: any = [];
  MyDataSource: any;
  displayedColumns: string[] = [
    'position',
    'Volume',
    'Day Left',
    'Blood Group',
    'action',
  ];

  constructor(private serv: DetailsService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.serv
      .getGroup()
      .subscribe((data: any) => this.GroupArray=[...data]);
    this.getStock();
  }
  getStock() {
    this.serv.getStock().subscribe((data: any) => {
      this.apiResponse = data;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.cdata = data.length;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  openDialog() {
    this.dialog.open(AddStockComponent);
  }
  opendataDialog(userid: string) {
    this.serv.getStockref(userid).subscribe(val=>this.serv.setData(val));
    this.dialog.open(ViewcomComponent);
  }
  // To Edit Stock
  editStock(stockid: string) {
    this.dialog.open(EditStockComponent);
    this.serv.change(stockid);
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
