import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-tmp',
  templateUrl: './tmp.page.html',
  styleUrls: ['./tmp.page.scss'],
})
export class TmpPage implements OnInit {

  constructor(private storer: StorageService, public router: Router) { }

  ngOnInit() {

    // this.storer.getUserProfile().then((profile) => {

    //   if (profile === 'saloon') {
    //     this.router.navigate(['login']);
    //   } else {
    //     this.router.navigate(['client']);
    //   }

    // });

  }

}
