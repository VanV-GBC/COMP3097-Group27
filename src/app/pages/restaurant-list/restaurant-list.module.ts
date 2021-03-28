import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantListPage } from './restaurant-list.page';
import { RestaurantListPagePageRoutingModule } from './restaurant-list-routing.module';
import { ItemListComponent } from '../../modules/item-list/item-list.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RestaurantListPagePageRoutingModule,
  ],
  declarations: [RestaurantListPage, ItemListComponent],
})
export class RestaurantListPagePageModule {}
