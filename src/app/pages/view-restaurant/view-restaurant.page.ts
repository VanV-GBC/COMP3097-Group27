import { Tag } from './../../services/tag';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Restaurant } from '../../services/restaurant';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.page.html',
  styleUrls: ['./view-restaurant.page.scss'],
  providers: [CallNumber],
})
export class ViewRestaurantPage implements OnInit, OnDestroy {
  private subscription: Subscription;
  public restaurant: Restaurant;
  tags: Tag[] = [];
  isSocialSharingAvailable = false;
  isEmailSharingAvailable = false;
  isFacebookSharingAvailable = false;
  isTwitterSharingAvailable = false;
  isAndroid = this.platform.is('android');
  isApple = this.platform.is('ios');
  fbAppName = this.isAndroid ? 'facebook' : 'com.apple.social.facebook';
  twAppName = this.isAndroid ? 'twitter' : 'com.apple.social.twitter';

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private callNumber: CallNumber,
    private socialSharing: SocialSharing,
    private platform: Platform
  ) {
    this.tags = this.data.tags;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.restaurant = this.data.getRestaurantById(id);
      this.tags = this.data.tags;
      if (this.isAndroid || this.isApple) {
        // Check if sharing is supported
        this.socialSharing
          .canShareViaEmail()
          .then(() => {
            this.isEmailSharingAvailable = true;
            this.isSocialSharingAvailable =
              this.isEmailSharingAvailable ||
              this.isTwitterSharingAvailable ||
              this.isFacebookSharingAvailable;
          })
          .catch(() => {
            this.isEmailSharingAvailable = false;
            this.isSocialSharingAvailable =
              this.isEmailSharingAvailable ||
              this.isTwitterSharingAvailable ||
              this.isFacebookSharingAvailable;
          });
        this.socialSharing
          .canShareVia(this.fbAppName, 'test', null, null, null)
          .then(() => {
            this.isFacebookSharingAvailable = true;
            this.isSocialSharingAvailable =
              this.isEmailSharingAvailable ||
              this.isTwitterSharingAvailable ||
              this.isFacebookSharingAvailable;
          })
          .catch(() => {
            this.isFacebookSharingAvailable = false;
            this.isSocialSharingAvailable =
              this.isEmailSharingAvailable ||
              this.isTwitterSharingAvailable ||
              this.isFacebookSharingAvailable;
          });
        this.socialSharing
          .canShareVia(this.twAppName, 'test', null, null, null)
          .then(() => {
            this.isTwitterSharingAvailable = true;
            this.isSocialSharingAvailable =
              this.isEmailSharingAvailable ||
              this.isTwitterSharingAvailable ||
              this.isFacebookSharingAvailable;
          })
          .catch(() => {
            this.isTwitterSharingAvailable = false;
            this.isSocialSharingAvailable =
              this.isEmailSharingAvailable ||
              this.isTwitterSharingAvailable ||
              this.isFacebookSharingAvailable;
          });
      }
    });
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

  shareThis(
    shareType: string,
    restaurantName: string,
    restaurantAddress: string,
    restaurantCity: string,
    restaurantProvince: string,
    restaurantPostal: string,
    message: string
  ) {
    if (shareType == 'email') {
      this.socialSharing
        .shareViaEmail(
          `${message}\nLocation:\n${restaurantAddress}\n${restaurantCity}, ${restaurantProvince}   ${restaurantPostal}`,
          `Check out ${restaurantName}`,
          []
        )
        .then(() => {})
        .catch(() => {});
    } else if (shareType == 'facebook') {
      this.socialSharing
        .shareVia(
          this.fbAppName,
          `${message}\nLocation:\n${location}`,
          null,
          null
        )
        .then(() => {})
        .catch(() => {});
    } else if (shareType == 'twitter') {
      this.socialSharing
        .shareVia(
          this.twAppName,
          `${message}\nLocation:\n${location}`,
          null,
          null
        )
        .then(() => {})
        .catch(() => {});
    }
  }
}
