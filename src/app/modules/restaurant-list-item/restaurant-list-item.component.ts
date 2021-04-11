import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../services/restaurant';

@Component({
  selector: 'app-restaurant-list-item',
  templateUrl: './restaurant-list-item.component.html',
  styleUrls: ['./restaurant-list-item.component.scss'],
})
export class RestaurantItemListComponent implements OnInit {
  @Input() restaurant: Restaurant;

  constructor() {}

  ngOnInit() {}

  onRatingChange(rating) {
    console.log('The evaluation was modified and now its value is: ', rating);
    // do your stuff
  }
}
