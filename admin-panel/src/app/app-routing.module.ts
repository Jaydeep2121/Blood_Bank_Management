import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DonorsComponent } from './profiles/donors/donors.component';
import { ProfileComponent } from './profiles/profile.component';
import { EmployeeComponent } from './profiles/employee-component/employee.component';
import { UsersComponent } from './profiles/users/users.component';
import { ListUserComponent } from './profiles/users/list-user/list-user.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DetailsComponent } from './details/details.component';
import { StorageComponent } from './details/storage/storage.component';
import { BloodBankComponent } from './details/blood-bank/blood-bank.component';
import { StockComponent } from './details/storage/stock/stock.component';
import { UrequestComponent } from './details/storage/urequest/urequest.component';
import { ListDonorComponent } from './profiles/donors/list-donor/list-donor.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  {
    path: 'Mprofiles',
    component: ProfileComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent,
        children: [{ path: '', component: ListUserComponent }],
      },
      { 
        path: 'donors', 
        component: DonorsComponent,
        children: [{ path: '', component: ListDonorComponent }],
      },
      { path: 'employee', component: EmployeeComponent },
    ],
  },
  {
    path: 'Mdetails',
    component: DetailsComponent,
    children: [
      {
        path: 'storage',
        component: StorageComponent,
        children: [
          { path: '', component: StockComponent },
          { path: 'stock', component: StockComponent },
          { path: 'urequest', component:  UrequestComponent}
        ],
      },
      { path: 'bbank', component: BloodBankComponent },
    ],
  },
  { path: 'perProfile', component: MyProfileComponent },
  { path: '**', component: HomeComponentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
