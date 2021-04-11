import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../services/restaurant';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-restaurant-list-item',
  templateUrl: './restaurant-list-item.component.html',
  styleUrls: ['./restaurant-list-item.component.scss'],
})
export class RestaurantItemListComponent implements OnInit {
  @Input() restaurant: Restaurant;

  constructor(private data: DataService) {}

  ngOnInit() {}

  onRatingChange(rating) {
    this.restaurant.rating = rating;
    this.data.updateRestaurant(this.restaurant);
  }
}
