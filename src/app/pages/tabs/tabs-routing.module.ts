import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'restaurant-list',
        loadChildren: () =>
          import('../restaurant-list/restaurant-list.module').then(
            (m) => m.RestaurantListPagePageModule
          ),
      },
      {
        path: 'add-restaurant',
        loadChildren: () =>
          import('../add-restaurant/add-restaurant.module').then(
            (m) => m.AddRestaurantPageModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('../about/about.module').then((m) => m.AboutPageModule),
      },
      {
        path: 'add-restaurant/:id',
        loadChildren: () =>
          import('../add-restaurant/add-restaurant.module').then(
            (m) => m.AddRestaurantPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/restaurant-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/restaurant-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
