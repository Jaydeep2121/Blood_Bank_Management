import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
const routes: Routes = [
  {
    path:'',
    component:UsersComponent,
    children:[
      {
        path:'',
        loadChildren:()=>import('./list-user/index.module').then(x => x.ListUserModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    AngularMaterialModule
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule
  ]
})
export class UserModule { }
