import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, ModalController } from '@ionic/angular';

import { FetcherService } from '../../services/fetcher.service';
import { StorageService } from '../../services/storage.service';

import { GnawsPage } from '../modals/gnaws/gnaws.page';
import { ClientsPage } from '../modals/clients/clients.page';



@Component({
  selector: 'app-saloon',
  templateUrl: './saloon.page.html',
  styleUrls: ['./saloon.page.scss'],
})
export class SaloonPage implements OnInit {

  slidesOptions = {
    slidesPerView: 1.4
  };

  constructor(public modal: ModalController,
    public menu: MenuController,
    public router: Router,
    private storer: StorageService) { }

  ngOnInit() {

  }

  openMenu() {
    this.menu.open('sidem');
  }

  async showGnawsModal() {

    const modal = await this.modal.create({
      component: GnawsPage,
      componentProps: {
        displayType: 'saloon'
      }
    });

    return await modal.present();
  }

  async showClientsModal() {

    const modal = await this.modal.create({
      component: ClientsPage
    });

    return await modal.present();
  }

  logout() {
    this.router.navigate(['login']);
  }

}
