import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SlickCarouselModule } from 'ngx-slick-carousel';  
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Angular Material Module
import { AngularMaterialModule } from './angular-material.module';
// component Files
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { FeatureComponent } from './feature/feature.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    FeatureComponent,
    GalleryComponent,
    ContactUsComponent,
    UserRegComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
