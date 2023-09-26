import {NgModule} from '@angular/core';
import {AboutPageComponent} from './about-page.component';
import {AboutPageRoutingModule} from './about-rouring.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  imports: [AboutPageRoutingModule, NzButtonModule, NzIconModule],
  declarations: [AboutPageComponent],
  exports: [AboutPageComponent],
})
export class AboutPageModule {
}
