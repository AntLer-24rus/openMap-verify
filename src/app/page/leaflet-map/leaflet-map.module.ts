import {NgModule} from '@angular/core';
import {LeafletMapComponent} from './leaflet-map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';
import {NzRateModule} from 'ng-zorro-antd/rate';
import {FormsModule} from '@angular/forms';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {LeafletPageRoutingModule} from './leaflet-rouring.module';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {ModalWinModule} from '../modal-win/modal-win.module';

@NgModule({
  imports: [
    LeafletModule,
    LeafletDrawModule,
    ModalWinModule,
    NzRateModule,
    FormsModule,
    NzSpinModule,
    NzButtonModule,
    NzIconModule,
    LeafletPageRoutingModule,
    NzModalModule,
  ],
  declarations: [LeafletMapComponent],
  exports: [LeafletMapComponent],
})
export class LeafletMapModule {
}
