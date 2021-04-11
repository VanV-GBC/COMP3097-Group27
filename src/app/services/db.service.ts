import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Restaurant } from './restaurant';
import { Tag } from './tag';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private storage: SQLiteObject;
  tagsList = new BehaviorSubject([]);
  restaurantList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.platform
      .ready()
      .then(() => {
        this.sqlite
          .create({
            name: 'my_guide_db.db',
            location: 'default',
          })
          .then(async (db: SQLiteObject) => {
            this.storage = db;
            this.createTables();
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchTags(): Observable<Tag[]> {
    return this.tagsList.asObservable();
  }

  fetchRestaurants(): Observable<Restaurant[]> {
    return this.restaurantList.asObservable();
  }

  async createTables() {
    this.storage
      .executeSql(
        `CREATE TABLE IF NOT EXISTS tags(
      id INTEGER PRIMARY KEY,
      name TEXT
    )`,
        []
      )
      .then((_) => {
        this.getTags();
        this.isDbReady.next(true);
      });
    this.storage
      .executeSql(
        `CREATE TABLE IF NOT EXISTS restaurants(
          id INTEGER PRIMARY KEY,
          name TEXT,
          rating REAL,
          phone TEXT,
          notes TEXT,
          tags TEXT,
          address TEXT,
          city TEXT,
          province TEXT,
          postal TEXT,
          country TEXT,
          lat FLOAT,
          lon FLOAT,
          )`,
        []
      )
      .then((_) => {
        this.getRestaurants();
        this.isDbReady.next(true);
      });
  }

  getTags() {
    return this.storage.executeSql('SELECT * FROM tags', []).then((res) => {
      let items: Tag[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            name: res.rows.item(i).name,
          });
        }
      }
      this.tagsList.next(items);
    });
  }

  getTagsFromString(s: string): number[] {
    var v = s
      .split(',')
      .map((i) => (isNaN(+i) ? undefined : +i))
      .filter((i) => !isNaN(i));
    if (v.length > 0) return v;
    return [];
  }

  storeTagsToString(t: number[]): string {
    return t.join(',');
  }

  getRestaurants() {
    return this.storage
      .executeSql('SELECT * FROM restaurants', [])
      .then((res) => {
        let items: Restaurant[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              name: res.rows.item(i).name,
              rating: res.rows.item(i).rating,
              phone: res.rows.item(i).phone,
              notes: res.rows.item(i).notes,
              tags: this.getTagsFromString(res.rows.item(i).tags),
              address: {
                address: res.rows.item(i).address,
                city: res.rows.item(i).city,
                province: res.rows.item(i).province,
                postal: res.rows.item(i).postal,
                country: res.rows.item(i).country,
                lat: res.rows.item(i).lat,
                lon: res.rows.item(i).lon,
              },
            });
          }
        }
        this.restaurantList.next(items);
      });
  }

  addTag(name: string) {
    let data = [name];
    return this.storage
      .executeSql('INSERT INTO tags (name) VALUES (?)', data)
      .then((res) => {
        this.getTags();
      });
  }

  addRestaurant(r: Restaurant) {
    let data = [
      r.name,
      r.rating,
      r.phone,
      r.notes,
      this.storeTagsToString(r.tags),
      r.address.address,
      r.address.city,
      r.address.province,
      r.address.postal,
      r.address.country,
      r.address.lat,
      r.address.lon,
    ];
    return this.storage
      .executeSql(
        `INSERT INTO restaurants (
        name,
        rating,
        phone,
        notes,
        tags,
        address,
        city,
        province,
        postal,
        country,
        lat,
        lon
        ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )`,
        data
      )
      .then((res) => {
        this.getRestaurants();
      });
  }

  deleteTag(id: number) {
    return this.storage
      .executeSql('DELETE FROM tags WHERE id = ?', [id])
      .then((res) => {
        this.getTags();
      });
  }

  deleteRestaurant(id: number) {
    return this.storage
      .executeSql('DELETE FROM restaurants WHERE id = ?', [id])
      .then((res) => {
        this.getRestaurants();
      });
  }
}
