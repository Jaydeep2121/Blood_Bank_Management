import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { FeatureComponent } from './feature/feature.component';

const routes: Routes = [
  { 
    path: '', component: HomeComponent,
    children:[ 
      {path: '', component: FeatureComponent,outlet: 'feature'},
      {path: '', component: FooterComponent,outlet: 'footer'}
    ]
  },
  { 
    path: 'home', component: HomeComponent,
    children:[ 
      {path:'',component:FeatureComponent,outlet: 'feature'},
      {path: '', component: FooterComponent,outlet: 'footer'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
