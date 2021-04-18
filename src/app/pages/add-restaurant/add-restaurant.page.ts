import { Tag } from './../../services/tag';
import { Restaurant } from './../../services/restaurant';
import { Component, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import {
  AlertController,
  ToastController,
  NavController,
  NavParams,
} from '@ionic/angular';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: 'add-restaurant.page.html',
  styleUrls: ['add-restaurant.page.scss'],
})
export class AddRestaurantPage {
  @Input() restaurant: Restaurant;
  tags: Tag[] = [];
  showTagEdit = false;
  validation = {
    name: false,
    street: false,
    city: false,
    province: false,
  };
  pageTitle: string = 'Add';
  isAdd: boolean = true;

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1,
  };

  constructor(
    private data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private nativeGeocoder: NativeGeocoder
  ) {
    this.restaurant = new Restaurant();
    this.tags = this.data.tags;
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.tags = this.data.tags;
    if (!!id) {
      this.restaurant = this.data.getRestaurantById(id);
      if (this.restaurant && this.restaurant.id !== '') {
        this.pageTitle = 'Edit';
        this.isAdd = false;
      }
    }
  }

  onSave() {
    let searchString =
      this.restaurant.name + ' ' + this.restaurant.address.city;
    this.validate();
    if (
      !!this.restaurant.name &&
      !!this.restaurant.address.city &&
      !!this.restaurant.address.street &&
      !!this.restaurant.address.province
    ) {
      if (this.isAdd) {
        this.onGetMap(searchString);
        this.data.addRestaurant(this.restaurant);
      } else {
        this.onGetMap(searchString);
        this.data.updateRestaurant(this.restaurant);
      }
      this.restaurant = new Restaurant();
      this.router.navigate(['/tabs/restaurant-list']);
    }
  }

  isValid() {
    return (
      this.validation.name &&
      this.validation.city &&
      this.validation.province &&
      this.validation.street
    );
  }

  removeTag(tag: Tag) {
    this.data.deleteTag(tag);
    this.getFreshTagList();
  }

  async updateTag(tag: Tag) {
    this.getFreshTagList();
    const alert = await this.alertController.create({
      header: 'Edit a tag',
      message: `Please update tag name`,
      inputs: [{ name: 'tag', type: 'text', value: tag.name }],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'Update',
          handler: (alertData) => {
            if (alertData.tag) {
              tag.name = alertData.tag;
              this.data.updateTag(tag);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  editTags() {
    this.getFreshTagList();
    this.showTagEdit = !this.showTagEdit;
  }

  async addTag() {
    this.getFreshTagList();
    const alert = await this.alertController.create({
      header: 'Add a tag',
      message: `Please enter tag name`,
      inputs: [{ name: 'tag', type: 'text', placeholder: 'Add a tag' }],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'Add',
          handler: (alertData) => {
            if (alertData.tag) {
              this.data.addTag(alertData.tag);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  validate(type = 'all') {
    if (type == 'name') {
      this.validation.name = !this.restaurant.name;
    } else if (type == 'city') {
      this.validation.city = !this.restaurant.address.city;
    } else if (type == 'province') {
      this.validation.province = !this.restaurant.address.province;
    } else if (type == 'street') {
      this.validation.street = !this.restaurant.address.street;
    } else {
      this.validation.name = !this.restaurant.name;
      this.validation.city = !this.restaurant.address.city;
      this.validation.province = !this.restaurant.address.province;
      this.validation.street = !this.restaurant.address.street;
    }
    this.isValid();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: `Are you sure you want to delete ${this.restaurant.name}?`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.restaurant = new Restaurant();
            this.router.navigate(['/tabs/restaurant-list']);
          },
        },
        {
          text: 'Yes',
          handler: () => {
            if (!this.isAdd) {
              this.data.deleteRestaurant(this.restaurant);
            }
            this.restaurant = new Restaurant();
            this.router.navigate(['/tabs/restaurant-list']);
          },
        },
      ],
    });
    await alert.present();
  }

  getFreshTagList() {
    this.tags = this.data.tags;
  }

  onDelete() {
    this.presentAlertConfirm();
  }

  onRatingChange(rating) {
    this.restaurant.rating = rating;
  }

  onGetMap(sstring) {
    this.nativeGeocoder
      .forwardGeocode(sstring, this.options)
      .then((result: NativeGeocoderResult[]) => {
        this.restaurant.address.lat = parseFloat(result[0].latitude);
        this.restaurant.address.lon = parseFloat(result[0].longitude);
      })
      .catch((error: any) => console.log(error));
  }
}
