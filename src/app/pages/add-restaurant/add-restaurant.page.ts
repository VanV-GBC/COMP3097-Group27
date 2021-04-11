import { Component } from '@angular/core';
import { Restaurant } from '../../services/restaurant';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: 'add-restaurant.page.html',
  styleUrls: ['add-restaurant.page.scss'],
})
export class AddRestaurantPage {
  restaurant: Restaurant;
  pageTitle: string = 'Add';
  isAdd: boolean = true;
  constructor(
    private data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.restaurant = JSON.parse(JSON.stringify(this._emptyRestaurant));
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.restaurant = this.data.getRestaurantById(id);
    if (this.restaurant.id !== '') {
      this.pageTitle = 'Edit';
      this.isAdd = false;
    }
    console.log(this.data.getRestaurantById(id));
  }

  private _emptyRestaurant: Restaurant = {
    id: '',
    name: '',
    address: {
      address: '',
      city: '',
      province: '',
    },
  };

  onSave() {
    if (this.isAdd) {
      this.data.addRestaurant(this.restaurant);
    } else {
      this.data.updateRestaurant(this.restaurant);
    }
    this.restaurant = JSON.parse(JSON.stringify(this._emptyRestaurant));
    this.router.navigate(['/tabs/restaurant-list']);
  }
  onDelete() {
    if (!this.isAdd) {
      this.data.deleteRestaurant(this.restaurant);
    }
    this.restaurant = JSON.parse(JSON.stringify(this._emptyRestaurant));
    this.router.navigate(['/tabs/restaurant-list']);
  }

  onRatingChange(rating) {
    this.restaurant.rating = rating;
  }
}
