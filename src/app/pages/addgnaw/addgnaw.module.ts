import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddgnawPageRoutingModule } from './addgnaw-routing.module';

import { AddgnawPage } from './addgnaw.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddgnawPageRoutingModule
  ],
  declarations: [AddgnawPage]
})
export class AddgnawPageModule {}
