/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { FetcherService } from '../../../services/fetcher.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements OnInit {

  measurements: any;

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    public modal: ModalController,
    public alerter: AlertController,
    public loader: LoadingController) { }

  ngOnInit() {
    this.storer.getUserSGI().then((val) => {
      this.displayMeasurements(val);
    });
  }

  async displayMeasurements(sgi: string) {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Recupération de vos mesures...'
    });

    load.present().then(() => {

      this.fetcher.getMeasurements(sgi).subscribe((result) => {
        if (result.CODE === 'MFS') {
          this.measurements = result.DATA;
          load.dismiss();
        } else if (result.CODE === 'NMF') {
          load.dismiss();
          this.notify('Aucune donnée', 'Aucune mesure a été trouvée.');
        } else {
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de la recupération de vos mesures, veuillez réessayer');
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

  goBack() {
    this.modal.dismiss({
      dismissed: true
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
            this.goBack();
          }
        }
      ]
    });
    await alert.present();
  }

}
