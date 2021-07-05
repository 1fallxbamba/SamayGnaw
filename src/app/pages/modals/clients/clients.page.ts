import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController, ModalController } from '@ionic/angular';

import { FetcherService } from '../../../services/fetcher.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  @Input() displayType: string;

  clients = [];

  toAddGnaws = false;

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    public modal: ModalController,
    public alerter: AlertController,
    public loader: LoadingController,
    public router: Router) { }

  ngOnInit() {
    this.storer.getUserSGI().then((sgi) => {
      this.displayClients(sgi).then(() => {
        if (this.displayType === 'toAddGnaw') {
          this.toAddGnaws = true;
        } else {
          this.toAddGnaws = false;
        }
      });
    });
  }

  async displayClients(saloonSGI: string) {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Recupération de vos clients...'
    });

    load.present().then(() => {

      this.fetcher.getSaloonsClients(saloonSGI).subscribe((result) => {

        load.dismiss().then(() => {

          if (result.CODE === 'CFS') {
            this.clients = JSON.parse(result.DATA);
          } else if (result.CODE === 'NCF') {
            this.notify('Aucune donnée', 'Aucun client n\'a été trouvé.');
          } else {
            this.notify('Erreur innatendue', 'Une erreur est survenue lors de la recupération de vos clients, veuillez réessayer');
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

  goToAddGnaw(clientSGI){
    this.goBack();
    this.router.navigate(['saloon/add-gnaw/' + clientSGI]);
  }

}
