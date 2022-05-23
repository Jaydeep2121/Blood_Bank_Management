import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { UserRegComponent } from './user-reg/user-reg.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [{ path: '', component: FooterComponent }],
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [{ path: '', component: FooterComponent }],
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    children: [{ path: '', component: FooterComponent }],
  },
  {
    path: 'contact',
    component: ContactUsComponent,
    children: [{ path: '', component: FooterComponent }],
  },
  { path:'usr_profile', component:UserProfileComponent},
  { path: 'login', component: LoginComponent },
  { path:'regi',component:UserRegComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
