import { MapFullscreenPageModule } from './../map-fullscreen/map-fullscreen.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRestaurantPage } from './view-restaurant.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRestaurantPage
  },
  {
    path: 'restaurant/:name/mapfs',
    loadChildren: () => import('../map-fullscreen/map-fullscreen.module')
    .then(m => MapFullscreenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRestaurantPageRoutingModule {}
