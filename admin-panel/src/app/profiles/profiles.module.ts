import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
/* All Profile Components And Modules */
import { AngularMaterialModule } from '../angular-material.module';
import { ViewListProfileComponent } from './users/list-user/view-list-profile/view-list-profile.component';
import { ProfileComponent } from './profile.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { ListDonorComponent } from './donors/list-donor/list-donor.component';
import { ViewListDonorComponent } from './donors/list-donor/view-list-donor/view-list-donor.component';
import { DonorsComponent } from './donors/donors.component';
import { AddDonorComponent } from './donors/add-donor/add-donor.component';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { ViewEmpProfileComponent } from './employees/list-employee/view-emp-profile/view-emp-profile.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
@NgModule({
  declarations: [
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    UsersComponent,
    ListUserComponent,
    ViewListDonorComponent,
    DonorsComponent,
    EmployeesComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeeComponent,
    ViewEmpProfileComponent,
    ViewListProfileComponent,
    ListDonorComponent,
    AddDonorComponent,
  ],
  imports: [
    RouterModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ProfilesRoutingModule,
    CommonModule,
  ],
})
export class ProfilesModule {}
