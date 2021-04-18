import { Tag } from './../../services/tag';
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
  tags: Tag[];
  restaurantTags: Tag[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.tags = this.data.tags;
    if (this.restaurant.tags) {
      this.restaurant.tags.forEach((i) => {
        this.restaurantTags.push(
          this.tags.find((x) => {
            return x.id === i;
          })
        );
      });
    }
  }

  onRatingChange(rating) {
    this.restaurant.rating = rating;
    this.data.updateRestaurant(this.restaurant);
  }
}
