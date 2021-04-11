import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Restaurant } from '../../services/restaurant';

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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.restaurant = this.data.getRestaurantById(id);
    console.log(this.data.getRestaurantById(id));
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Back' : '';
  }
}
