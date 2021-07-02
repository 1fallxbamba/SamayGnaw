/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storer: NativeStorage) { }

  setUserProfile(profile: string): Promise<any> {
    return this.storer.setItem('SGPROFILE', profile);
  }

  getUserProfile(): Promise<string> {
    return this.storer.getItem('SGPROFILE');
  }

  setUserSGI(sgi: string): Promise<any> {
    return this.storer.setItem('SGI', sgi);
  }

  getUserSGI(): Promise<string> {
    return this.storer.getItem('SGI');
  }

}
