import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Restaurant } from './restaurant';
import { ToastController } from '@ionic/angular';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dummyTagData: Tag[] = [
    { id: 1, name: 'Japanese' },
    { id: 2, name: 'Mexican' },
    { id: 3, name: 'Chinese' },
    { id: 4, name: 'Grill' },
    { id: 5, name: 'Vegetarian' },
    { id: 6, name: 'Beer' },
    { id: 7, name: 'Chicken' },
    { id: 8, name: 'Sit Down Place' },
    { id: 9, name: 'Quick Bite' },
  ];

  private dummyRestaurantData: Restaurant[] = [
    {
      id: 1,
      name: 'Cluck Clucks Chicken & Waffles',
      rating: 5,
      notes: 'Amazing chicken for good price.',
      phone: '6477482582',
      address: {
        address: '222 The Esplanade',
        city: 'Toronto',
        province: 'ON',
        postal: 'M5A 4M8',
      },
      tags: [7, 8],
    },
    {
      id: 2,
      name: 'Bier Markt',
      rating: 4.5,
      notes: 'Great beer selection and ok food',
      phone: '4168627575',
      address: {
        address: '58 The Esplanade',
        city: 'Toronto',
        province: 'ON',
        postal: 'M5E 1A6',
      },
      tags: [6, 9],
    },
    {
      id: 3,
      name: 'HOTHOUSE',
      rating: 2.5,
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque augue felis, sit amet convallis quam consequat sed. Duis non bibendum neque. Sed rutrum orci quis mollis tristique. Nullam accumsan rhoncus tellus, vitae viverra eros dapibus volutpat. Cras est augue, ornare feugiat semper nec, blandit sed ex. Nullam et suscipit leo. Cras quis lacinia mauris. \nDuis malesuada iaculis pellentesque. Vestibulum mauris felis, ultricies in odio eget, feugiat dictum ex. Vestibulum posuere malesuada lectus ut finibus. Aliquam porta cursus nunc, dictum interdum nulla mollis nec. Praesent sit amet vulputate risus, ut commodo ex. Nulla vulputate nec arcu vel imperdiet. Curabitur egestas viverra nunc, at mollis lacus pretium at. Phasellus lorem ante, pretium ut congue sed, hendrerit ac nisl. Nam euismod justo scelerisque, consequat enim laoreet, fringilla odio. Phasellus vulputate dui id nibh ullamcorper ullamcorper.',
      address: {
        address: '35 Church St',
        city: 'Toronto',
        province: 'ON',
      },
    },
  ];

  private tags: Tag[] = [];
  private restaurants: Restaurant[] = [];

  constructor(private db: DbService, private toast: ToastController) {}

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if (res) {
        this.db.fetchTags().subscribe((item) => {
          this.tags = item;
        });
        this.db.fetchRestaurants().subscribe((item) => {
          this.restaurants = item;
        });
        if (this.restaurants.length == 0) {
          this.restaurants = this.dummyRestaurantData;
        }
        if (this.tags.length == 0) {
          this.tags = this.dummyRestaurantData;
        }
      }
    });
  }

  public getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  public getRestaurantByName(name: string): Restaurant {
    return this.restaurants.find((i) => i.name == name);
  }
}
