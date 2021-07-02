import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController, AlertController } from '@ionic/angular';

import { AuthService } from '../../services/authentication.service';
import { StorageService } from '../../services/storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginData: any = { sgi: '', pwd: ''};


  constructor(private auth: AuthService,
    private storer: StorageService,
    public router: Router,
    public loader: LoadingController,
    public alerter: AlertController) { }

  ngOnInit() {
  }

  async login() {

    const load = await this.loader.create({
      spinner: 'circular',
      message: 'Authentification en cours...'
    });

    load.present().then(() => {

      this.auth.logUserIn(this.loginData).subscribe((response) => {
        if (response.CODE === 'USA') {
          load.dismiss();
          this.storer.getUserSGI().then((val) => {
            if ( val === undefined || val === null ) {
              this.storer.setUserSGI(this.loginData.sgi).then(() => {
                this.router.navigate(['saloon']);
              });
            } else {
              this.router.navigate(['saloon']);
            }
          });

        } else if (response.CODE === 'WPWD') {
          load.dismiss();
          this.notify('Mot de passe incorrect', 'Le mot de passe que vous avez entré est incorrect, veuillez réessayer.');
        } else if (response.CODE === 'UDNE') {
          load.dismiss();
          this.notify('Utilisateur inexistant', 'Le SGI que vous avez renseigné n\'existe pas.');
        } else {
          load.dismiss();
          this.notify('Erreur innatendue', 'Une erreur est survenue lors de l\'authentification, veuillez réessayer');
        }
      },
        error => {
          load.dismiss();
          const responseMessage = `Une erreur est survenue lors de la connexion à nos serveurs, vérifiez votre connexion puis réessayer`;
          this.notify('Erreur de connexion', responseMessage);
        }
      );

    });

  }

  async notify(title, msg) {
    const alert = await this.alerter.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}
