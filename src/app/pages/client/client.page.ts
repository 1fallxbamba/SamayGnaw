/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { MeasurementsPage } from '../modals/measurements/measurements.page';

import { FetcherService } from '../../services/fetcher.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  constructor(public modal: ModalController) { }

  ngOnInit() {
  }

  async showModal() {

    const modal = await this.modal.create({
      component: MeasurementsPage
    });

    return await modal.present();
  }

}