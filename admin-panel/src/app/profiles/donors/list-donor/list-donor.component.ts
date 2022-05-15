import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditDonorComponent } from '../edit-donor/edit-donor.component';
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
  MyDataSource: any;
  displayedColumns: string[] = [
    'position',
    'Name',
    'Gender',
    'Email',
    'Contact',
    'action',
  ];

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
    this.serv.getDonor().subscribe((data: any) => {
      this.apiResponse = data;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.cdata=data.length;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  // To Edit donor
  editDonor(userid: string) {
    this.dialog.open(EditDonorComponent);
    this.serv.change(userid);
  }
  deleteDonor(userid: string) {
    this.serv.deleteUser(userid);
  }
  // Search specific result
  filterData($event : any){
    this.MyDataSource.filter = $event.target.value;
  }
  openDialog(userid: string) {
    this.serv.getDonorref(userid).subscribe(val=>this.serv.setData(val));
    this.dialog.open(ViewListDonorComponent);
  }
  onChange($event:any){
    let filteredData = _.filter(this.apiResponse,(item:any) =>{
      return item.gender.toLowerCase() ==  $event.value.toLowerCase();
    })
    this.MyDataSource = new MatTableDataSource(filteredData); 
  }
}
