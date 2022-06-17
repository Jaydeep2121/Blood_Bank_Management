import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ViewProfileComponent } from './my-profile/view-profile/view-profile.component';
import { ApprlComponent } from './apprl/apprl.component';
import { AngularMaterialModule } from './angular-material.module';
import { LoadingInterceptor } from './auth/loading.interceptor';
import { ProfilesModule } from './profiles/profiles.module';
import { DetailModule } from './details/detail.module';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponentComponent,
    HomeComponentComponent,
    MyProfileComponent,
    ViewProfileComponent,
    ApprlComponent,
    ForgotPassComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    MatSliderModule,
    ProfilesModule,
    DetailModule,
    AngularMaterialModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [
    CookieService,
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }