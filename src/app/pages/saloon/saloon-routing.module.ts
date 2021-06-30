import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaloonPage } from './saloon.page';

const routes: Routes = [
  {
    path: '',
    component: SaloonPage
  },
  {
    path: 'add-client',
    loadChildren: () => import('../addclient/addclient.module').then(m => m.AddclientPageModule)
  },
  {
    path: 'add-gnaw',
    loadChildren: () => import('../addgnaw/addgnaw.module').then(m => m.AddgnawPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('../modals/clients/clients.module').then(m => m.ClientsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaloonPageRoutingModule {}
