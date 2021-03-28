import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantListPage } from './restaurant-list.page';
import { RestaurantListPagePageRoutingModule } from './restaurant-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RestaurantListPagePageRoutingModule,
  ],
  declarations: [RestaurantListPage],
})
export class RestaurantListPagePageModule {}
