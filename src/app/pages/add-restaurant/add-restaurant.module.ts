import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddRestaurantPage } from './add-restaurant.page';
import { AddRestaurantPageRoutingModule } from './add-restaurant-routing.module';
import { IonicRatingComponentModule } from 'ionic-rating-component';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AddRestaurantPageRoutingModule,
    IonicRatingComponentModule,
  ],
  declarations: [AddRestaurantPage],
  providers: [],
})
export class AddRestaurantPageModule {}
