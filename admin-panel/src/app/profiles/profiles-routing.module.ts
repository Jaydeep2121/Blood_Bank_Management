import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DonorsComponent } from './donors/donors.component';
import { ProfileComponent } from './profile.component';
import { EmployeesComponent } from './employees/employees.component';
import { UsersComponent } from './users/users.component';
import { ListUserComponent } from './users/list-user/list-user.component';
import { ListDonorComponent } from './donors/list-donor/list-donor.component';
import { ListEmployeeComponent } from './employees/list-employee/list-employee.component';
import { DisplayUserService } from './MainService/display-user.service';
import { DisplayDonorService } from './MainService/display-donor.service';
import { DisplayEmpService } from './MainService/display-emp.service';
const routes: Routes = [
  {
    path: 'Mmprofiles',
    component: ProfileComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: '',
            component: ListUserComponent,
            resolve: [DisplayUserService],
          },
        ],
      },
      {
        path: 'donors',
        component: DonorsComponent,
        children: [
          {
            path: '',
            component: ListDonorComponent,
            resolve: [DisplayDonorService],
          },
        ],
      },
      {
        path: 'employee',
        component: EmployeesComponent,
        children: [
          {
            path: '',
            component: ListEmployeeComponent,
            resolve: [DisplayEmpService],
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilesRoutingModule {}
