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

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private callNumber: CallNumber
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.restaurant = this.data.getRestaurantById(id);
    console.log(this.data.getRestaurantById(id));
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Back' : '';
  }
  onRatingChange(rating) {
    console.log('The evaluation was modified and now its value is: ', rating);
    // do your stuff
  }

  callPlace(number: string) {
    this.callNumber.callNumber(number, true);
  }
}
