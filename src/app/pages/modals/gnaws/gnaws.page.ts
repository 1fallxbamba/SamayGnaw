import { Component, Input, OnInit } from '@angular/core';

import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { FetcherService } from '../../../services/fetcher.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-gnaws',
  templateUrl: './gnaws.page.html',
  styleUrls: ['./gnaws.page.scss'],
})
export class GnawsPage implements OnInit {

  @Input() displayType: string;

  // gnawsData: any = { sgis: [], saloons: [], datesC: [], datesL: [], prix: [], avances: [], etats: [], types: [] }; // OLD

  clientsGnaws;
  saloonsGnaws;
  clientsNames;

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    public modal: ModalController,
    public alerter: AlertController,
    public loader: LoadingController
  ) { }

  ngOnInit() {
    if (this.displayType === 'client') {
      this.displayClientsGnaws();
    } else {
      this.storer.getUserSGI().then((sgi) => {
        this.displaySaloonsGnaws(sgi);
      });
    }
  }

  async displayClientsGnaws() { // take care of sgi

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Recupération de vos gnaws...'
    });

    load.present().then(() => {

      this.fetcher.getClientsGnaws('SGC4-187').subscribe((result) => {

        load.dismiss();

        if (result.CODE === 'GFS') {

          this.clientsGnaws = result.DATA;

        } else if (result.CODE === 'NGF') {

          this.notify('Aucune donnée', 'Aucun gnaw n\'a été trouvé.');

        } else {
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de la recupération de vos gnaws, veuillez réessayer');
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

  async displaySaloonsGnaws(saloonSGI: string) {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Recupération de vos gnaws...'
    });

    load.present().then(() => {

      this.fetcher.getSaloonsGnaws(saloonSGI).subscribe((result) => {

        load.dismiss().then(() => {

          if (result.CODE === 'GFS') {
            this.saloonsGnaws = JSON.parse(result.DATA).GNAWS;
            this.clientsNames = JSON.parse(result.DATA).NAMES;
          } else if (result.CODE === 'NGF') {
            this.notify('Aucune donnée', 'Aucun gnaw n\'a été trouvé.');
          } else {
            this.notify('Erreur innatendue', 'Une erreur est survenue lors de la recupération de vos gnaws, veuillez réessayer');
          }

        });

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
