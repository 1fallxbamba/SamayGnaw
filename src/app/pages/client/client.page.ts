/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { FetcherService } from '../../services/fetcher.service';
import { MeasurementsPage } from '../modals/measurements/measurements.page';
import { GnawsPage } from '../modals/gnaws/gnaws.page';


@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  async showMeasurementsModal() {

    const modal = await this.modal.create({
      component: MeasurementsPage
    });

    return await modal.present();
  }

  async showGnawsModal() {

    const modal = await this.modal.create({
      component: GnawsPage
    });

    return await modal.present();
  }

}
