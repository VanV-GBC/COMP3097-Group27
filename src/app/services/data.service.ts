import { Injectable } from '@angular/core';

export interface Tag {
  name: string;
  id: number;
}

export interface Address {
  address: string;
  city: string;
  province: string;
  country?: string;
  lat?: number;
  lon?: number;
}

export interface Restaurant {
  name: string;
  rating?: number;
  address: Address;
  tags?: Tag[];
  phone?: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public restaurants: Restaurant[] = [
    {
      name: 'Restaurant 1',
      rating: 2.5,
      address: {
        address: '123 John St.',
        city: 'Toronto',
        province: 'ON',
      },
    },
    {
      name: 'Restaurant 2',
      rating: 5,
      address: {
        address: '321 Down Ave.',
        city: 'Toronto',
        province: 'ON',
      },
    },
    {
      name: 'Restaurant 3',
      rating: 4.5,
      address: {
        address: '1 Main Rd.',
        city: 'Toronto',
        province: 'ON',
      },
    },
  ];

  constructor() {}

  public getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  public getRestaurantById(name: string): Restaurant {
    return this.restaurants[name];
  }
}
