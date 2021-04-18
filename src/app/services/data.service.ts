import { DummyData } from './dummy-data';
import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Restaurant } from './restaurant';
import { ToastController } from '@ionic/angular';
import { Tag } from './tag';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public tags: Tag[] = [];
  public restaurants: Restaurant[] = [];
  private _tagsStorageKey: string = 'tags_storage';
  private _restaurantsStorageKey: string = 'restaurants_storage';
  private _dummyData: DummyData = new DummyData();

  constructor(private db: DbService, private toast: ToastController) {
    this.getRestaurants();
    this.getTags();
  }

  private getRestaurants() {
    this.db
      .get(this._restaurantsStorageKey)
      .then((res) => {
        if (res !== null) {
          this.restaurants = res;
        } else if (res === null) {
          this.restaurants = this._dummyData.getRestaurants();
          this.db
            .set(this._restaurantsStorageKey, this.restaurants)
            .then(async (res) => {
              let toast = await this.toast.create({
                message: `Sample data added!`,
                duration: 1000,
              });
              toast.present();
            })
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  }

  private getTags() {
    this.db
      .get(this._tagsStorageKey)
      .then((res) => {
        if (res !== null) {
          this.tags = res;
        } else if (res === null) {
          this.tags = this._dummyData.getTags();
          this.db
            .set(this._tagsStorageKey, this.tags)
            .then(async (res) => {
              let toast = await this.toast.create({
                message: `Sample data added!`,
                duration: 1000,
              });
              toast.present();
            })
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => console.log(e));
  }

  ngOnInit() {}

  private randId(size: number = 10) {
    const nums = Array.from({ length: 10 }, (_, i) =>
      String.fromCharCode('0'.charCodeAt(0) + i)
    );
    const alphabets = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode('a'.charCodeAt(0) + i)
    );
    const chars = [...nums, ...alphabets];
    const rand = (length) => Math.floor(Math.random() * length);
    return Array.from({ length: size }, () => chars[rand(chars.length)]).join(
      ''
    );
  }

  private generateUniqueId(arr: Array<any>) {
    let uniqueId = this.randId();
    while (arr.findIndex((i) => i.id === uniqueId) !== -1) {
      uniqueId = this.randId();
    }
    return uniqueId;
  }

  private findItemById(arr: Array<any>, id: string) {
    const index = arr.findIndex((i) => i.id === id);
    return index;
  }

  private updateStorage(key: string, data: any, message: string) {
    this.db
      .set(key, data)
      .then(async (res) => {
        let toast = await this.toast.create({
          message: message,
          duration: 1500,
        });
        toast.present();
      })
      .catch((e) => console.log(e));
  }

  public addRestaurant(r: Restaurant) {
    const uid = this.generateUniqueId(this.restaurants);
    r.id = uid;
    this.restaurants.push(r);
    this.updateStorage(
      this._restaurantsStorageKey,
      this.restaurants,
      `Restaurant ${r.name} added!`
    );
  }

  public updateRestaurant(r: Restaurant) {
    const idx = this.findItemById(this.restaurants, r.id);
    if (idx !== -1) {
      this.restaurants[idx] = r;
      this.updateStorage(
        this._restaurantsStorageKey,
        this.restaurants,
        `Restaurant ${r.name} updated!`
      );
    }
  }

  public deleteRestaurant(r: Restaurant) {
    const idx = this.findItemById(this.restaurants, r.id);
    if (idx !== -1) {
      this.restaurants.splice(idx, 1);
      this.updateStorage(
        this._restaurantsStorageKey,
        this.restaurants,
        `Restaurant ${r.name} was deleted!`
      );
    }
  }

  public addTag(t: string) {
    const uid = this.generateUniqueId(this.tags);
    let tag = { name: t, id: uid };
    this.tags.push(tag);
    this.updateStorage(
      this._tagsStorageKey,
      this.tags,
      `Tag ${tag.name} added!`
    );
  }

  public updateTag(t: Tag) {
    const idx = this.findItemById(this.tags, t.id);
    if (idx !== -1) {
      this.tags[idx] = t;
      this.updateStorage(
        this._tagsStorageKey,
        this.tags,
        `Tag ${t.name} updated!`
      );
    }
  }

  public deleteTag(t: Tag) {
    const idx = this.findItemById(this.tags, t.id);
    if (idx !== -1) {
      this.tags.splice(idx, 1);
      this.updateStorage(
        this._tagsStorageKey,
        this.tags,
        `Tag ${t.name} was deleted!`
      );
    }
  }

  public sortRestaurants(by: string, order: string) {
    if (by === 'proximity') {
      // TODO: figure out how to sort based on proximity
      // need lat/lon of place and current lat/lon of user
    } else if (by === 'name') {
      if (order === 'asc') {
        this.restaurants.sort((a, b) => (a[by] > b[by] ? 1 : -1));
      } else if (order === 'desc') {
        this.restaurants.sort((a, b) => (a[by] < b[by] ? 1 : -1));
      }
    } else if (by == 'rating') {
      if (order === 'asc') {
        this.restaurants.sort((a, b) => {
          return a[by] - b[by];
        });
      } else if (order === 'desc') {
        this.restaurants.sort((a, b) => {
          return b[by] - a[by];
        });
      }
    }
  }

  public getRestaurantById(id: string): Restaurant {
    return this.restaurants.find((i) => i.id === id);
  }
}
