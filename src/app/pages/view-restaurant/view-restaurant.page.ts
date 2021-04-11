import { Tag } from './../../services/tag';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Restaurant } from '../../services/restaurant';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.page.html',
  styleUrls: ['./view-restaurant.page.scss'],
  providers: [CallNumber],
})
export class ViewRestaurantPage implements OnInit {
  public restaurant: Restaurant;
  tags: Tag[] = [];

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private callNumber: CallNumber
  ) {
    this.tags = this.data.tags;
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.restaurant = this.data.getRestaurantById(id);
    this.tags = this.data.tags;
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Back' : '';
  }
  onRatingChange(rating) {
    this.restaurant.rating = rating;
    this.data.updateRestaurant(this.restaurant);
  }

  callPlace(number: string) {
    this.callNumber.callNumber(number, true);
  }
}
