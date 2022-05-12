import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from 'src/app/profiles/users/edit-user/edit-user.component';
import { UserServiceService } from 'src/app/profiles/users/services/user-service.service';
import * as _ from 'lodash';
import { ViewListProfileComponent } from 'src/app/profiles/users/list-user/view-list-profile/view-list-profile.component';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  apiResponse:any = [];
  MyDataSource: any;
  cdata: any;
  displayedColumns: string[] = [
    'position',
    'Name',
    'Gender',
    'Email',
    'Contact',
    'action',
  ];

  constructor(
    private serv: UserServiceService, 
    public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.serv.getUser().subscribe((data: any) => {
      this.apiResponse = data;
      this.cdata = data.length;
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource = data;
      this.MyDataSource.paginator = this.paginator;
      this.MyDataSource.sort = this.sort;
    });
  }
  // To Edit User
  editUser(userid: string) {
    this.dialog.open(EditUserComponent);
    this.serv.change(userid);
  }
  deleteUser(userid: string) {
    this.serv.deleteUser(userid);
  }
  // Search specific result
  filterData($event : any){
    this.MyDataSource.filter = $event.target.value;
  }
  openDialog(userid: string) {
    this.serv.getUserref(userid).subscribe(val=>this.serv.setData(val));
    this.dialog.open(ViewListProfileComponent);
  }
  onChange($event:any){
    let filteredData = _.filter(this.apiResponse,(item:any) =>{
      return item.gender.toLowerCase() ==  $event.value.toLowerCase();
    })
    this.MyDataSource = new MatTableDataSource(filteredData); 
  }

}
