import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapFullscreenPage } from './map-fullscreen.page';

const routes: Routes = [
  {
    path: '',
    component: MapFullscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapFullscreenPageRoutingModule {}
