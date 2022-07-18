import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ApprlComponent } from './apprl/apprl.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path:'forget-pass',component:ForgotPassComponent },
  { 
    path:'Mprofiles',
    loadChildren:()=>import('./profiles/profiles.module').then(m=>m.ProfilesModule)
  },
  {
    path:'Mdetails',
    loadChildren:()=>import('./details/detail.module').then(m=>m.DetailModule)
  },
  { path: 'perProfile', component: MyProfileComponent },
  { path: 'apprl', component: ApprlComponent },
  { path: '**', component: HomeComponentComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
