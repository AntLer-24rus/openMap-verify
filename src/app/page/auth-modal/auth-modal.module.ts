import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthModalComponent} from './auth-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputModule} from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    ReactiveFormsModule,
    NzInputModule,
  ],
  declarations: [AuthModalComponent],
  exports: [AuthModalComponent],
})
export class AuthModalModule {
}
