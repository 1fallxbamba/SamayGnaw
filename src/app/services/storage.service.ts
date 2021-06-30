/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  userProfile: string;

  constructor(private storer: Storage) { }

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
