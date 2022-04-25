import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'login', component: LoginComponentComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
