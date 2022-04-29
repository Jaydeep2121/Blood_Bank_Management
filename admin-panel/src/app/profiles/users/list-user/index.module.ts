import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserComponent } from './list-user.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';

const routes: Routes = [{path:'',component:ListUserComponent}];
@NgModule({
  declarations: [
    ListUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule.forChild(routes),
    AngularMaterialModule
  ],
  exports:[
    AngularMaterialModule
  ]
})
export class ListUserModule { }
