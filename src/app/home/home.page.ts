/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';

import { FetcherService } from '../services/fetcher.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  Gnaws: any = [];

  constructor(private fetcher: FetcherService) { }

  seeGnaws() {

    this.fetcher.getGnaws('77SGS-1111902111').subscribe((data) => {
      console.log(data);
    });

  }

  seeMeasurements() {
    this.fetcher.getMeasurements('SGC4-187').subscribe((data) => {
      console.log(data);
    });
  }

}
