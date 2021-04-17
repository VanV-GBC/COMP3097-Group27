// import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { MapFullscreenPageModule } from './../map-fullscreen/map-fullscreen.module';
import { MapPartialModule } from './../../modules/map-partial/map-partial.module';
import { MapPartialComponent } from './../../modules/map-partial/map-partial.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { ViewRestaurantPageRoutingModule } from './view-restaurant-routing.module';
import { ViewRestaurantPage } from './view-restaurant.page';
import { IonicRatingComponentModule } from 'ionic-rating-component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewRestaurantPageRoutingModule,
    MapPartialModule,
    IonicRatingComponentModule,
  ],
  declarations: [ViewRestaurantPage, MapPartialComponent],
})
export class ViewRestaurantPageModule {}
