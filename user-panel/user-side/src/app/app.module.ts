import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';  
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Angular Material Module
import { AngularMaterialModule } from './angular-material.module';
// component Files
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BloodAvaComponent } from './blood-ava/blood-ava.component';
import { CampComponent } from './camp/camp.component';
import { LoadingInterceptor } from 'auth/loading.interceptor';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { DonorEligComponent } from './donor-elig/donor-elig.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    GalleryComponent,
    ContactUsComponent,
    UserRegComponent,
    LoginComponent,
    UserProfileComponent,
    BloodAvaComponent,
    CampComponent,
    ForgetPassComponent,
    DonorEligComponent
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    AngularMaterialModule,
    NgxPaginationModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
