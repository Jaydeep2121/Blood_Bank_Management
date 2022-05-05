import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DonorComponent } from './profiles/donor-component/donor.component';
import { ProfileComponent } from './profiles/profile.component';
import { EmployeeComponent } from './profiles/employee-component/employee.component';
import { UsersComponent } from './profiles/users/users.component';
import { ListUserComponent } from './profiles/users/list-user/list-user.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  {
    path: 'Mprofiles',
    component: ProfileComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent, children: [
          { path: '', component: ListUserComponent }
        ]
      },
      { path: 'donors', component: DonorComponent },
      { path: 'employee', component: EmployeeComponent },
    ],
  },
  { path:'perProfile',component:MyProfileComponent},
  { path: '**', component: HomeComponentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
