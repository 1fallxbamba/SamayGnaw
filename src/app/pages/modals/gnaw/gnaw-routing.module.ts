import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GnawPage } from './gnaw.page';

const routes: Routes = [
  {
    path: '',
    component: GnawPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GnawPageRoutingModule {}
