import { AddRestaurantPage } from './../../pages/add-restaurant/add-restaurant.page';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapPartialComponent } from './map-partial.component';

@NgModule({
  declarations: [MapPartialComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
  ],
  exports:[MapPartialComponent, GoogleMapsModule],
  providers: [AddRestaurantPage],
  bootstrap: [MapPartialComponent],
})
export class MapPartialModule {}
