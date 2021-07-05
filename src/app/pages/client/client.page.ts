/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { FetcherService } from '../../services/fetcher.service';
import { StorageService } from '../../services/storage.service';

import { MeasurementsPage } from '../modals/measurements/measurements.page';
import { GnawsPage } from '../modals/gnaws/gnaws.page';


@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  clientInfo = { name: '', saloonName: '', saloonPhone: 0 };

  constructor(
    public storer: StorageService,
    private fetcher: FetcherService,
    public modal: ModalController) { }

  ngOnInit() {
    this.storer.getUserSGI().then((val) => {
      this.retrieveInfo(val);
    });
  }

  async showMeasurementsModal() {

    const modal = await this.modal.create({
      component: MeasurementsPage
    });

    return await modal.present();
  }

  async showGnawsModal() {

    const modal = await this.modal.create({
      component: GnawsPage,
      componentProps: {
        displayType: 'client'
      }
    });

    return await modal.present();
  }

  retrieveInfo(sgi) {
    this.fetcher.getClientInfo(sgi).subscribe((result) => {
      this.clientInfo.name = result.NAME;
      this.clientInfo.saloonName = result.SALOONNAME;
      this.clientInfo.saloonPhone = result.SALOONPHONE;
    });
  }

}
