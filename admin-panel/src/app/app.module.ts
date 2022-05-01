import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
/* app routing */ 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* Components */
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { EmployeeComponent } from './profiles/employee-component/employee.component';
import { DonorComponent } from './profiles/donor-component/donor.component';
import { ProfileComponent } from './profiles/profile.component';
/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';
/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponentComponent } from './home-component/home-component.component';
import { CookieService } from 'ngx-cookie-service';
import { AddUserComponent } from './profiles/users/add-user/add-user.component';
import { EditUserComponent } from './profiles/users/edit-user/edit-user.component';
import { UsersComponent } from './profiles/users/users.component';
import { ListUserComponent } from './profiles/users/list-user/list-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponentComponent,
    HomeComponentComponent,
    DonorComponent,
    EmployeeComponent,
    ProfileComponent,
    AddUserComponent,
    EditUserComponent,
    UsersComponent,
    ListUserComponent
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