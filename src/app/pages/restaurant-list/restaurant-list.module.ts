import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantListPage } from './restaurant-list.page';
import { RestaurantListPageRoutingModule } from './restaurant-list-routing.module';
import { RestaurantItemListComponent } from '../../modules/restaurant-list-item/restaurant-list-item.component';
import { IonicRatingComponentModule } from 'ionic-rating-component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RestaurantListPageRoutingModule,
    IonicRatingComponentModule,
  ],
  declarations: [RestaurantListPage, RestaurantItemListComponent],
})
export class RestaurantListPagePageModule {}
