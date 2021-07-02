/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storer: Storage) { }

  // NATIVE STORAGE
  // setUserProfile(profile: string): Promise<any> {
  //   return this.storer.setItem('SGPROFILE', profile);
  // }

  // getUserProfile(): Promise<string> {
  //   return this.storer.getItem('SGPROFILE');
  // }

  // setUserSGI(sgi: string): Promise<any> {
  //   return this.storer.setItem('SGI', sgi);
  // }

  // getUserSGI(): Promise<string> {
  //   return this.storer.getItem('SGI');
  // }

  // WEB STORAGE

  setUserProfile(profile: string): Promise<any> {
    return this.storer.set('SGPROFILE', profile);
  }

  getUserProfile(): Promise<string> {
    return this.storer.get('SGPROFILE');
  }

  setUserSGI(sgi: string): Promise<any> {
    return this.storer.set('SGI', sgi);
  }

  getUserSGI(): Promise<string> {
    return this.storer.get('SGI');
  }

}
