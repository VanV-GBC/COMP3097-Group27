import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Restaurant } from '../../services/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: 'restaurant-list.page.html',
  styleUrls: ['restaurant-list.page.scss'],
})
export class RestaurantListPage {
  sortOrder = 'desc';
  sortBy = 'name';

  constructor(private data: DataService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getRestaurants(): Restaurant[] {
    return this.data.restaurants;
  }

  sort() {
    console.log(this.sortOrder);
    console.log(this.sortBy);
    this.data.sortRestaurants(this.sortBy, this.sortOrder);
  }
}
