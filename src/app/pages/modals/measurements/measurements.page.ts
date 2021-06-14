/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { FetcherService } from '../../../services/fetcher.service';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
})
export class MeasurementsPage implements OnInit {

  measurements;

  constructor(private fetcher: FetcherService,public modal: ModalController) { }

  ngOnInit() {
    this.displayMeasurements();
  }

  displayMeasurements() {
    this.fetcher.getMeasurements('SGC4-187').subscribe((result) => {
      if(result.CODE === 'MFS') {
        this.measurements = result.DATA;
      } else if (result.CODE === 'NMF') {
        ///
      } else {
        /// error
      }
    },
    err => {}
    );
  }

  goBack() {
    this.modal.dismiss({
      dismissed: true
    });
  }

}
