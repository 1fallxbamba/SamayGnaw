import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';

import { PosterService } from '../../services/poster.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-addgnaw',
  templateUrl: './addgnaw.page.html',
  styleUrls: ['./addgnaw.page.scss'],
})
export class AddgnawPage implements OnInit {

  gnawData = { prop: '', saloon: '', dateL: '', price: 0, avance: 0, type: '' };

  constructor(
    private poster: PosterService,
    private storer: StorageService,
    public alerter: AlertController,
    public loader: LoadingController,
    public router: Router,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.storer.getUserSGI().then((sgi) => {
      this.gnawData.saloon = sgi;
      this.gnawData.prop = this.route.snapshot.params.sgi;
    });
  }

  async addGnaw() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Ajout de votre gnaw en cours...'
    });

    load.present().then(() => {

      this.poster.postGnaw(this.gnawData).subscribe((response) => {

        load.dismiss();

        if (response.CODE === 'NGSA') {

          this.notify('Opération réussie', 'Votre nouveau gnaw a été ajouté avec succés. \n Le sgi  est : ' + response.DATA);

        } else if (response.CODE === 'UNEX') {
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de la création du gnaw, veuillez réessayer.');
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


  async notify(title: string, msg: string) {
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
