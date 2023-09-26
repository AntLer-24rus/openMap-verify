import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthModalModule} from './page/auth-modal/auth-modal.module';
import {AboutPageModule} from './page/about-page/about-page.module';
import {LeafletMapModule} from './page/leaflet-map/leaflet-map.module';
import {LeafletPageRoutingModule} from './page/leaflet-map/leaflet-rouring.module';
import {AboutPageRoutingModule} from './page/about-page/about-rouring.module';
import {ErrorPageModule} from './page/error-page/error-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AboutPageModule,
    AppRoutingModule,
    LeafletMapModule,
    LeafletPageRoutingModule,
    AboutPageRoutingModule,
    HttpClientModule,
    AuthModalModule,
    ErrorPageModule,
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {
}
