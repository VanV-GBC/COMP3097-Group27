import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'restaurant/:id',
    loadChildren: () =>
      import('./pages/view-restaurant/view-restaurant-routing.module').then(
        (m) => m.ViewRestaurantPageRoutingModule
      ),
  },
  {
    path: 'view-restaurant',
    loadChildren: () =>
      import('./pages/view-restaurant/view-restaurant.module').then(
        (m) => m.ViewRestaurantPageModule
      ),
  },
  {
    path: 'tabs/add-restaurant/:id',
    loadChildren: () =>
      import('./pages/add-restaurant/add-restaurant.module').then(
        (m) => m.AddRestaurantPageModule
      ),
  },
  {
    path: 'restaurant/:name/mapfs',
    loadChildren: () =>
      import('./pages/map-fullscreen/map-fullscreen.module').then(
        (m) => m.MapFullscreenPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
