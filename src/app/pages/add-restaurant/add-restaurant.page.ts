import { Component } from '@angular/core';
import { Restaurant } from '../../services/restaurant';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: 'add-restaurant.page.html',
  styleUrls: ['add-restaurant.page.scss'],
})
export class AddRestaurantPage {
  constructor(private data: DataService) {}

  restaurant: Restaurant = {
    id: 0,
    name: '',
    address: {
      address: '',
      city: '',
      province: '',
    },
  };

  onSave() {
    this.data.addRestaurant(this.restaurant);
  }

  onRatingChange(rating) {
    this.restaurant.rating = rating;
  }
}
