import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, DataService } from '../../services/data.service';

@Component({
  selector: 'map-fullscreen',
  templateUrl: './map-fullscreen.page.html',
  styleUrls: ['./map-fullscreen.page.scss'],
})
export class MapFullscreenPage implements OnInit {

  public restaurant: Restaurant;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.restaurant = this.data.getRestaurantByName(name);
    console.log(this.data.getRestaurantByName(name));
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Back' : '';
  }

}
