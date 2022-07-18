import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/* All Details Components And Modules */
import { AngularMaterialModule } from '../angular-material.module';
import { DetailsComponent } from './details.component';
import { StorageComponent } from './storage/storage.component';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { BviewProfileComponent } from './blood-bank/bview-profile/bview-profile.component';
import { StockComponent } from './storage/stock/stock.component';
import { UrequestComponent } from './storage/urequest/urequest.component';
import { AddStockComponent } from './storage/stock/add-stock/add-stock.component';
import { EditStockComponent } from './storage/stock/edit-stock/edit-stock.component';
import { ViewcomComponent } from './storage/stock/viewcom/viewcom.component';
import { CampsComponent } from './camps/camps.component';
import { AddCampComponent } from './camps/add-camp/add-camp.component';
import { ListCampComponent } from './camps/list-camp/list-camp.component';
import { EditCampComponent } from './camps/edit-camp/edit-camp.component';
import { DetailRoutingModule } from './detail-routing.module';

@NgModule({
  declarations: [
    DetailsComponent,
    StorageComponent,
    BloodBankComponent,
    BviewProfileComponent,
    StockComponent,
    UrequestComponent,
    EditStockComponent,
    AddStockComponent,
    ViewcomComponent,
    CampsComponent,
    AddCampComponent,
    ListCampComponent,
    EditCampComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DetailRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
})
export class DetailModule {}
