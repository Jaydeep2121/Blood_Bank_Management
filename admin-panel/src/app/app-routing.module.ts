import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ProfileComponent } from './profiles/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  {
    path: 'login',
    component: LoginComponentComponent
  },
  {
    path: 'Mprofiles',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
