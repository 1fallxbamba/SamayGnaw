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



}
