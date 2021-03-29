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
  providers: [],
  bootstrap: [MapPartialComponent],
})
export class MapPartialModule {}
