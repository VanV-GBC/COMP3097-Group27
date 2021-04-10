import { Component } from '@angular/core';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: 'add-restaurant.page.html',
  styleUrls: ['add-restaurant.page.scss'],
})
export class AddRestaurantPage {
  constructor() {}

  onRatingChange(rating) {
    console.log('The evaluation was modified and now its value is: ', rating);
    // do your stuff
  }
}
