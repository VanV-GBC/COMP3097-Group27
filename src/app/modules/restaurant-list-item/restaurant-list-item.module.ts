import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RestaurantItemListComponent } from './restaurant-list-item.component';

@NgModule({
  declarations: [RestaurantItemListComponent],
  exports: [RestaurantItemListComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
})
export class ItemListModule {}
