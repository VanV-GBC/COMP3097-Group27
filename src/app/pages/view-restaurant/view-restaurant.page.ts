import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Restaurant } from '../../services/data.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.page.html',
  styleUrls: ['./view-restaurant.page.scss'],
})
export class ViewRestaurantPage implements OnInit {
  public restaurant: Restaurant;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.restaurant = this.data.getRestaurantByName(name);
  }
}
