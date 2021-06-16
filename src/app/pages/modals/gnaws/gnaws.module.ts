import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GnawsPageRoutingModule } from './gnaws-routing.module';

import { GnawsPage } from './gnaws.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GnawsPageRoutingModule
  ],
  declarations: [GnawsPage]
})
export class GnawsPageModule {}
