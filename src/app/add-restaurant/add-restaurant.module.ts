import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddRestaurantPage } from './add-restaurant.page';
import { AddRestaurantPageRoutingModule } from './add-restaurant-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AddRestaurantPageRoutingModule,
  ],
  declarations: [AddRestaurantPage],
})
export class AddRestaurantPageModule {}
