import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GnawsPage } from './gnaws.page';

const routes: Routes = [
  {
    path: '',
    component: GnawsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GnawsPageRoutingModule {}
