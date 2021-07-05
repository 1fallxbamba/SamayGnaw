import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController, MenuController, ModalController } from '@ionic/angular';

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

  saloonInfo = { name: '', totalGnaws: 0, ongoing: 0, finished: 0 };

  constructor(
    private fetcher: FetcherService,
    private storer: StorageService,
    public loader: LoadingController,
    public modal: ModalController,
    public menu: MenuController,
    public router: Router) { }

  ngOnInit() {
    this.storer.getUserSGI().then((val) => {
      this.retriveInfo(val);
    });

  }

  retriveInfo(sgi) {
    this.fetcher.getSaloonInfo(sgi).subscribe((result) => {

      this.saloonInfo.name = result.NAME;
      this.saloonInfo.totalGnaws = result.GNAWS;
      this.saloonInfo.ongoing = result.ONGOING;
      this.saloonInfo.finished = result.FINISHED;

    },
      err => {
        // to handle later
      });
  }

  openMenu() {
    this.menu.open('sidem');
  }

  closeMenu() {
    this.menu.close('sidem');
  }

  async showGnawsModal() {

    this.closeMenu();

    const modal = await this.modal.create({
      component: GnawsPage,
      componentProps: {
        displayType: 'saloon'
      }
    });

    return await modal.present();
  }

  async showClientsModal(dType: string) {

    this.closeMenu();

    const modal = await this.modal.create({
      component: ClientsPage,
      componentProps: {
        displayType: dType
      }
    });

    return await modal.present();
  }

  async logout() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Deconnexion...'
    });

    load.present().then(() => { // Fake loader hihihi
      load.dismiss();
      this.router.navigate(['login']);
    });
  }

}
