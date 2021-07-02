import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private storer: StorageService, private router: Router) {}

  ngOnInit() {

    // this.storer.getUserProfile().then((profile) => {

    //   if (profile === 'saloon') {
    //     this.router.navigate(['login']);
    //   } else if (profile === 'client') {
    //     this.router.navigate(['client']);
    //   } else {
    //     this.router.navigate(['home']);
    //   }

    // });

  }

}
