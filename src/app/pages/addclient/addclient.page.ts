import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { PosterService } from '../../services/poster.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.page.html',
  styleUrls: ['./addclient.page.scss'],
})
export class AddclientPage implements OnInit {

  genderOptions = ['Masculin', 'Féminin'];

  clientData = {
    saloon: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: '',
    cou: 0,
    epaule: 0,
    poitrine: 0,
    ceinture: 0,
    tourBras: 0,
    tourPoignet: 0,
    longManche: 0,
    longPant: 0,
    longTaille: 0,
    longCaftan: 0,
    tourCuisse: 0,
    tourCheville: 0
  };

  constructor(
    private poster: PosterService,
    private storer: StorageService,
    public alerter: AlertController,
    public loader: LoadingController,
    public router: Router,
    public screen: ScreenOrientation) { }

  ngOnInit() {
    // this.screen.lock(this.screen.ORIENTATIONS.LANDSCAPE);
    this.storer.getUserSGI().then((sgi) => {
      this.clientData.saloon = sgi;
    });
  }

  getGender(val: string) {
    this.clientData.gender = val;
  }

  async addClient() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Ajout de votre client en cours...'
    });

    load.present().then(() => {

      this.poster.postClient(this.clientData).subscribe((response) => {

        load.dismiss();

        if (response.CODE === 'NCSA') {

          this.notify('Opération réussie',
            'Votre nouveau client a été ajouté avec succés. \n Veuillez lui communiquer son sgi qui est : ' + response.DATA);

        } else if (response.CODE === 'UNEX') {
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de la création du client, veuillez réessayer.');
        }

      },
        err => {
          load.dismiss();
          const responseMessage = `Une erreur est survenue lors de la connexion à nos serveurs, vérifiez votre connexion puis réessayer`;
          this.notify('Erreur de connexion', responseMessage);
        }
      );

    });

  }

  async notify(title, msg) {
    const alert = await this.alerter.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['saloon']);
          }
        }
      ]
    });
    await alert.present();
  }

}
