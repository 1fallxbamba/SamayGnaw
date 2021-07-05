import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeFr, 'fr');

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GnawsPageModule } from './pages/modals/gnaws/gnaws.module';
import { MeasurementsPageModule } from './pages/modals/measurements/measurements.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__samaygnawLite',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [
    ScreenOrientation,
    NativeStorage,
    GnawsPageModule,
    MeasurementsPageModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
