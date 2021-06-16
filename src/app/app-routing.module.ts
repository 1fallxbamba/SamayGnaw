import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'saloon',
    loadChildren: () => import('./pages/saloon/saloon.module').then( m => m.SaloonPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./pages/client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'measurements',
    loadChildren: () => import('./pages/modals/measurements/measurements.module').then( m => m.MeasurementsPageModule)
  },
  {
    path: 'gnaws',
    loadChildren: () => import('./pages/modals/gnaws/gnaws.module').then( m => m.GnawsPageModule)
  },
  {
    path: 'gnaw',
    loadChildren: () => import('./pages/modals/gnaw/gnaw.module').then( m => m.GnawPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
