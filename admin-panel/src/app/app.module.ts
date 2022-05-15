import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
/* app routing */ 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* Components */
import { HomeComponentComponent } from './home-component/home-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { EmployeeComponent } from './profiles/employee-component/employee.component';
import { ProfileComponent } from './profiles/profile.component';
import { AddUserComponent } from './profiles/users/add-user/add-user.component';
import { EditUserComponent } from './profiles/users/edit-user/edit-user.component';
import { UsersComponent } from './profiles/users/users.component';
import { ListUserComponent } from './profiles/users/list-user/list-user.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ViewProfileComponent } from './my-profile/view-profile/view-profile.component';
import { DetailsComponent } from './details/details.component';
import { StorageComponent } from './details/storage/storage.component';
import { BloodBankComponent } from './details/blood-bank/blood-bank.component';
import { BviewProfileComponent } from './details/blood-bank/bview-profile/bview-profile.component';
import { ViewListProfileComponent } from './profiles/users/list-user/view-list-profile/view-list-profile.component';
import { StockComponent } from './details/storage/stock/stock.component';
import { UrequestComponent } from './details/storage/urequest/urequest.component';
import { AddStockComponent } from './details/storage/stock/add-stock/add-stock.component';
import { EditStockComponent } from './details/storage/stock/edit-stock/edit-stock.component';
import { ViewcomComponent } from './details/storage/stock/viewcom/viewcom.component';
import { AddDonorComponent } from './profiles/donors/add-donor/add-donor.component';
import { EditDonorComponent } from './profiles/donors/edit-donor/edit-donor.component';
import { ListDonorComponent } from './profiles/donors/list-donor/list-donor.component';
import { ViewListDonorComponent } from './profiles/donors/list-donor/view-list-donor/view-list-donor.component';
import { DonorsComponent } from './profiles/donors/donors.component';
/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponentComponent,
    HomeComponentComponent,
    EmployeeComponent,
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    UsersComponent,
    ListUserComponent,
    MyProfileComponent,
    ViewProfileComponent,
    DetailsComponent,
    StorageComponent,
    BloodBankComponent,
    BviewProfileComponent,
    ViewListProfileComponent,
    StockComponent,
    UrequestComponent,
    EditStockComponent,
    AddStockComponent,
    ListDonorComponent,
    ViewcomComponent,
    AddDonorComponent,
    EditDonorComponent,
    ViewListDonorComponent,
    DonorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    AngularMaterialModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }