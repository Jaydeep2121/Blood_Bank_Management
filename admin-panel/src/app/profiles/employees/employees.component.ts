import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog() {
    this.dialog.open(AddEmployeeComponent);
  }

}
