import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { CampsComponent } from './camps/camps.component';
import { ListCampComponent } from './camps/list-camp/list-camp.component';
import { DetailsComponent } from './details.component';
import { StockComponent } from './storage/stock/stock.component';
import { StorageComponent } from './storage/storage.component';
import { UrequestComponent } from './storage/urequest/urequest.component';

const routes: Routes = [{
    path: '',
    component: DetailsComponent,
    children: [
      {
        path: 'storage',
        component: StorageComponent,
        children: [
          { path: '', component: StockComponent },
          { path: 'stock', component: StockComponent },
          { path: 'urequest', component: UrequestComponent },
        ],
      },
      { path: 'bbank', component: BloodBankComponent },
      {
        path: 'camps',
        component: CampsComponent,
        children: [{ path: '', component: ListCampComponent }],
      },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
