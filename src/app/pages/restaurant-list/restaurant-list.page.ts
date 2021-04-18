import { Tag } from './../../services/tag';
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
  restaurants: Restaurant[];
  tags: Tag[];

  constructor(private data: DataService) {
    this.restaurants = this.data.restaurants;
    this.tags = this.data.tags;
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  filterRestaurants(ev: any) {
    let search = ev && ev.detail && ev.detail.value;
    if (!!search && search !== '') {
      let tagList = this.tags.filter((i) => {
        return i.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
      });
      let restaurantList = this.restaurants.filter((i) => {
        return (
          i.name.toLowerCase().indexOf(search.toLowerCase()) != -1 ||
          i.tags.filter((t) => {
            return tagList.filter((x) => x.id == t).length > 0;
          }).length > 0
        );
      });
      this.restaurants = restaurantList;
    } else {
      this.restaurants = this.data.restaurants;
      this.tags = this.data.tags;
    }
  }

  getRestaurants(): Restaurant[] {
    if (this.restaurants.length == 0) {
      this.filterRestaurants({});
    }
    return this.restaurants;
  }

  sort() {
    console.log(this.sortOrder);
    console.log(this.sortBy);
    this.data.sortRestaurants(this.sortBy, this.sortOrder);
  }
}
