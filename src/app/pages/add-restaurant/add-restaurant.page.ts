import { Restaurant } from './../../services/restaurant';
import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: 'add-restaurant.page.html',
  styleUrls: ['add-restaurant.page.scss'],
})
export class AddRestaurantPage {
  restaurant: Restaurant = new Restaurant();
  pageTitle: string = 'Add';
  isAdd: boolean = true;
  constructor(
    private data: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController
  ) {
    this.restaurant = new Restaurant();
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.restaurant = this.data.getRestaurantById(id);
    if (this.restaurant.id !== '') {
      this.pageTitle = 'Edit';
      this.isAdd = false;
    }
    console.log(this.data.getRestaurantById(id));
  }

  onSave() {
    if (this.isAdd) {
      this.data.addRestaurant(this.restaurant);
    } else {
      this.data.updateRestaurant(this.restaurant);
    }
    this.restaurant = new Restaurant();
    this.router.navigate(['/tabs/restaurant-list']);
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

  onDelete() {
    this.presentAlertConfirm();
  }

  onRatingChange(rating) {
    this.restaurant.rating = rating;
  }
}
