import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(
    key: string,
    value: any,
    stringify: boolean = true
  ): Promise<any> {
    try {
      const result = await this._storage?.set(
        key,
        stringify ? JSON.stringify(value) : value
      );
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  async get(key: string, parse: boolean = true): Promise<any> {
    try {
      const result = await this._storage?.get(key);
      if (result != null) {
        return parse ? JSON.parse(result) : result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return false;
    }
  }

  private async remove(key: string): Promise<any> {
    return await this._storage?.remove(key);
  }
}
