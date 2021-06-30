import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmpPageRoutingModule } from './tmp-routing.module';

import { TmpPage } from './tmp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmpPageRoutingModule
  ],
  declarations: [TmpPage]
})
export class TmpPageModule {}
