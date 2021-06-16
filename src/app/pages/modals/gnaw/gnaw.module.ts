import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GnawPageRoutingModule } from './gnaw-routing.module';

import { GnawPage } from './gnaw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GnawPageRoutingModule
  ],
  declarations: [GnawPage]
})
export class GnawPageModule {}
