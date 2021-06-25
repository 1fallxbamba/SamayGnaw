import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, ModalController } from '@ionic/angular';

import { FetcherService } from '../../services/fetcher.service';
import { GnawsPage } from '../modals/gnaws/gnaws.page';


@Component({
  selector: 'app-saloon',
  templateUrl: './saloon.page.html',
  styleUrls: ['./saloon.page.scss'],
})
export class SaloonPage implements OnInit {

  slidesOptions = {
    slidesPerView: 1.4
  };

  constructor(public modal: ModalController, public menu: MenuController, public router: Router) { }

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

  logout() {
    this.router.navigate(['login']);
  }

}
