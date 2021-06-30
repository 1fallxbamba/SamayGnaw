/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storer: StorageService, private alerter: AlertController, private router: Router) { }

  private switchProfile(type: string) {
    if (type === 'Salon') {
      this.storer.setUserProfile('saloon').then(() => {
        this.router.navigate(['login']);
      });
    } else {
      this.storer.setUserProfile('client');
      this.router.navigate(['client']);
    }
  }


  async setProfileAs(type) {
    const alert = await this.alerter.create({
      header: 'Confirmer le choix',
      message: 'Le choix du profil est définitif, vous ne pourrez plus le changer. \n Etes-vous vraiment un ' + type + ' ?',
      buttons: [
        {
          text: 'Oui, accepter',
          handler: () => {
            this.switchProfile(type);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
        }
      ],
    });
    await alert.present();
  }


}
