import { MapPartialComponent } from './../../modules/map-partial/map-partial.component';
import { MapPartialModule } from './../../modules/map-partial/map-partial.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapFullscreenPageRoutingModule } from './map-fullscreen-routing.module';

import { MapFullscreenPage } from './map-fullscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapFullscreenPageRoutingModule,
    MapPartialModule
  ],
  declarations: [MapFullscreenPage, MapPartialComponent]
})
export class MapFullscreenPageModule {}
