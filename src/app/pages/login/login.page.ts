import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(public mdl: ModalController) { }

  ngOnInit() {
  }

  close() {
    this.mdl.dismiss({
      dismissed: true
    });
  }

}
