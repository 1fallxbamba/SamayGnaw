import { Component, Input, OnInit } from '@angular/core';

import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { FetcherService } from '../../../services/fetcher.service';

@Component({
  selector: 'app-gnaws',
  templateUrl: './gnaws.page.html',
  styleUrls: ['./gnaws.page.scss'],
})
export class GnawsPage implements OnInit {

  @Input() displayType: string;

  gnawsData: any = { sgis: [], saloons: [], datesC: [], datesL: [], prix: [], avances: [], etats: [], types: [] };

  saloonsGnaws;

  constructor(
    private fetcher: FetcherService,
    public modal: ModalController,
    public alerter: AlertController,
    public loader: LoadingController
  ) { }

  ngOnInit() {
    if (this.displayType === 'client') {
      this.displayClientsGnaws();
    } else {
      this.displaySaloonsGnaws();
    }
  }

  async displayClientsGnaws() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Recupération des gnaws...'
    });

    load.present().then(() => {

      this.fetcher.getClientsGnaws('SGC4-187').subscribe((result) => {

        load.dismiss();

        if (result.CODE === 'GFS') {

          this.gnawsData.sgis = JSON.parse(result.DATA).sgis;
          this.gnawsData.saloons = JSON.parse(result.DATA).salons;
          this.gnawsData.datesC = JSON.parse(result.DATA).datesC;
          this.gnawsData.datesL = JSON.parse(result.DATA).datesL;
          this.gnawsData.prix = JSON.parse(result.DATA).prix;
          this.gnawsData.avances = JSON.parse(result.DATA).avances;
          this.gnawsData.etats = JSON.parse(result.DATA).etats;
          this.gnawsData.types = JSON.parse(result.DATA).types;

          // load.dismiss();

        } else if (result.CODE === 'NGF') {

          this.notify('Aucune donnée', 'Aucun gnaw n\'a été trouvé.');
        } else {
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de la recupération de vos gnaws, veuillez réessayer');
        }
      },
        err => {
          load.dismiss();
          const responseMessage = `Une erreur est survenue lors de la connexion à nos serveurs,
          veuillez réessayer vérifier votre connexion puis réessayer`;
          this.notify('Erreur de connexion', responseMessage);
        }
      );

    });

  }

  async displaySaloonsGnaws() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Recupération des gnaws...'
    });

    load.present().then(() => {

      this.fetcher.getSaloonsGnaws('77SGS-1001476110').subscribe((result) => {
        if (result.CODE === 'GFS') {

          this.saloonsGnaws = JSON.parse(result.DATA);
          load.dismiss();

        } else if (result.CODE === 'NGF') {
          load.dismiss();
          this.notify('Aucune donnée', 'Aucun gnaw n\'a été trouvé.');
        } else {
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de la recupération de vos gnaws, veuillez réessayer');
        }

      },
        err => {
          load.dismiss();
          const responseMessage = `Une erreur est survenue lors de la connexion à nos serveurs,
        veuillez réessayer vérifier votre connexion puis réessayer`;
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
