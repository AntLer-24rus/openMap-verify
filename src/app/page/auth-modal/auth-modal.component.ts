import {Component} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators,} from '@angular/forms';
import {TAuth} from '../../api/interfaces/marker.interface';
import {CustomModalService} from '../../services/custom-modal.service';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {AuthService} from '../../services/auth.service';

export type TMappedFormControls<ValueType> = FormGroup<{
  [Property in keyof ValueType]: FormControl<ValueType[Property]>;
}>;

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private modalService: CustomModalService,
    private modal: NzModalRef,
    private authService: AuthService,
  ) {
  }

  validateForm: TMappedFormControls<TAuth> = this.fb.group({
    userName: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitForm(): void {
    const email = this.validateForm.controls.userName.value;
    const password = this.validateForm.controls.password.value;
    if (this.authService.login(email, password)) {
      this.modalService.successAuthMessageModal();
    } else {
      this.modalService.errorAuthMessageModal();
    }
    this.modal.close();
  }
}
