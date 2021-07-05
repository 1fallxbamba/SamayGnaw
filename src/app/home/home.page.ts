/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';

import { StorageService } from '../services/storage.service';
import { FetcherService } from '../services/fetcher.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    public alerter: AlertController,
    public loader: LoadingController,
    public router: Router) { }

  // May need to add a promt later to confirm choice, let user know that profile selection is irreversible

  async identifySaloon(sgi: string) {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Vérification...'
    });

    load.present().then(() => {

      this.fetcher.getSaloonIdentity(sgi).subscribe((response) => {

        load.dismiss();

        if (response.CODE === 'SSA') {
          this.storer.setUserProfile('saloon').then(() => {
            this.router.navigate(['login']);
          });
        } else if (response.CODE === 'SDNE') {
          this.notify('Erreur d\'identification', 'Le SGI que vous avez entré n\'existe pas, veuillez réessayer en entrant un SGI correct');
        } else {
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de l\'identification, veuillez réessayer');
        }
      },
        err => {
          const responseMessage = `Une erreur est survenue lors de la connexion à nos serveurs, vérifiez votre connexion puis réessayer`;
          this.notify('Erreur de connexion', responseMessage);
        });

    });

  }

  async setProfileAsSaloon() {

    const alert = await this.alerter.create({
      header: 'Vérification Salon',
      message: `Veuillez entrez votre SGI fourni arpès votre demande d\'inscription sur samaygnaw.com. Si vous n\'en avez pas,
      veuillez vous rendre sur le site pour en créer.`,
      inputs: [
        {
          name: 'sgi',
          placeholder: 'Entrez votre SGI'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            this.identifySaloon(data.sgi);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();

  }

  async identifyClient(sgi: string) {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Vérification...'
    });

    load.present().then(() => {

      this.fetcher.getClientIdentity(sgi).subscribe((response) => {

        load.dismiss();

        if (response.CODE === 'CSA') {
          this.storer.setUserProfile('client').then(() => {
            this.storer.setUserSGI(sgi).then(() => {
              this.router.navigate(['client']);
            });
          });
        } else if (response.CODE === 'CDNE') {
          this.notify('Erreur d\'identification', 'Le SGI que vous avez entré n\'existe pas, veuillez réessayer en entrant un SGI correct');
        } else {
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de l\'identification, veuillez réessayer');
        }
      },
        err => {
          const responseMessage = `Une erreur est survenue lors de la connexion à nos serveurs, vérifiez votre connexion puis réessayer`;
          this.notify('Erreur de connexion', responseMessage);
        });

    });

  }

  async setProfileAsClient() {

    const alert = await this.alerter.create({
      header: 'Vérification client',
      message: `Veuillez entrez votre SGI fourni par votre salon. Si vous n\'en avez pas,
      veuillez vous rapprocher de votre salon pour en créer.`,
      inputs: [
        {
          name: 'sgi',
          placeholder: 'Entrez le SGI'
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            this.identifyClient(data.sgi);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await alert.present();

  }

  async notify(title: string, msg: string) {
    const alert = await this.alerter.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    await alert.present();
  }

  //   async setProfileAsSaloon() {
  //   const alert = await this.alerter.create({
  //     header: 'Confirmer le choix',
  //     message: 'Le choix du profil est définitif, vous ne pourrez plus le changer. \n Etes-vous vraiment un Salon ?',
  //     buttons: [
  //       {
  //         text: 'Oui, accepter',
  //         handler: () => {
  //           this.storer.setUserProfile('saloon').then(() => {
  //             this.router.navigate(['login']);
  //           });
  //         }
  //       },
  //       {
  //         text: 'Non, annuler',
  //         role: 'cancel',
  //       }
  //     ],
  //   });
  //   await alert.present();
  // }

}
