import { Address } from './../../services/address';
import { Restaurant } from './../../services/restaurant';
import { Component, Input, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

//declare var google;

@Component({
  selector: 'map-partial',
  templateUrl: './map-partial.component.html',
  styleUrls: ['./map-partial.component.scss'],
})
export class MapPartialComponent {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;



  center = { lat: 43.7087172 , lng: -79.4280774 };
  markerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  display?: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }

  constructor() {}
}
