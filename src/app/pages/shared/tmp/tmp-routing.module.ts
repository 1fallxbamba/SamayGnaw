import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmpPage } from './tmp.page';

const routes: Routes = [
  {
    path: '',
    component: TmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmpPageRoutingModule {}
