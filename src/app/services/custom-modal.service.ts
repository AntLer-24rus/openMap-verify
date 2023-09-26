import {EventEmitter, Injectable, Output} from '@angular/core';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {MarkerService} from '../api/services/marker.service';
import {TPatchMarker,} from '../api/interfaces/marker.interface';
import {AuthModalComponent} from '../page/auth-modal/auth-modal.component';
import {UntilDestroy} from '@ngneat/until-destroy';
import {ModalWinComponent} from '../page/modal-win/modal-win.component';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CustomModalService {
  @Output() cancelCreation: EventEmitter<void> = new EventEmitter<void>();

  showInfo: boolean = false;
  addInfo: boolean = false;
  updateInfo: boolean = false;
  logInModal: boolean = false;

  markerName: string;
  rate: number;
  indeterminateItems: string[];

  constructor(
    private _modalService: NzModalService,
    private markerService: MarkerService,
  ) {
  }

  saveInfoMarker(
    markerName: string,
    rating: number,
    indeterminateItems: string[],
  ) {
    this.markerName = markerName;
    this.rate = rating;
    this.indeterminateItems = indeterminateItems;

  }

  onCancelCreation(): void {
    this.cancelCreation.emit();
  }

  MarkerModal(nameAddress: string, lat: number, lng: number): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: nameAddress,
      nzContent: 'Вы действительно хотите добавить организацию?',
      nzFooter: [
        {
          label: 'Отменить',
          shape: 'round',
          onClick: () => {
            modal.destroy();
            this.onCancelCreation();
            nameAddress = '';
          },
        },
        {
          label: 'Добавить',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
            this.addInfoMarkerModal(nameAddress, lat, lng);
          },
        },
      ],
    });
  }

  addInfoMarkerModal(nameAddress: string, lat: number, lng: number): void {

    const modal: NzModalRef = this._modalService.create({
      nzTitle: nameAddress,
      nzContent: ModalWinComponent,
      nzFooter: null,
    });
    modal.componentInstance!.addInfo = true;
    modal.componentInstance!.lat = lat;
    modal.componentInstance!.long = lng;
    modal.componentInstance!.nameAddress = nameAddress;
  }

  completeMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: 'Успешно',
      nzContent: 'Ваш маркер был успешно добавлен',
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }

  errorMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: 'Ошибка!!!',
      nzContent: 'Проверьте что вы заполнили все поля!!!',
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }

  successAuthMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: 'Успешно',
      nzContent: 'Вы успешно вошли в аккаунт',
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }

  errorAuthMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: 'Ошибка!!!',
      nzContent: 'Войдите в аккаунт!!!',
      nzFooter: [
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'dashed',
          onClick: () => {
            modal.destroy();
          },
        },
        {
          label: 'Войти',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            this.authModal();
            modal.destroy();
          },
        },
      ],
    });
  }

  getInfoMarkerModal(
    name: string,
    rate: number,
    nameAddress: string,
    barrierFreeElements: string[],
    _id: string,
  ): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: name,
      nzContent: ModalWinComponent,
      nzClosable: false,
      nzFooter: [
        {
          label: 'Изменить',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
            this.updateMarkerInfo(name, rate, barrierFreeElements, _id);
          },
        },
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'dashed',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
    modal.componentInstance!.barrierFreeElements = barrierFreeElements;
    modal.componentInstance!.rate = rate;
    modal.componentInstance!.nameAddress = nameAddress;
    modal.componentInstance!.showInfo = true;
  }

  updateMarkerInfo(
    name: string,
    rate: number,
    barrierFreeElements: string[],
    _id: string,
  ) {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: name,
      nzContent: ModalWinComponent,
      nzClosable: false,
      nzFooter: [
        {
          label: 'Обновить',
          shape: 'round',
          type: 'primary',
          onClick: (modalWinComponent: ModalWinComponent) => {
            modalWinComponent.passDataToService();
            const sendData: TPatchMarker = {
              _id: _id,
              name: this.markerName,
              rate: this.rate,
              barrier_free_elements: this.indeterminateItems,
            };
            this.markerService.patchMarkerById(_id, sendData).subscribe({
              error: () => {
                this.errorMessageModal();
              },
              complete: () => {
                modal.destroy();
                this.completeMessageModal();
              },
            });
          },
        },
        {
          label: 'Закрыть',
          shape: 'round',
          type: 'dashed',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
    modal.componentInstance!.barrierFreeElements = barrierFreeElements;
    modal.componentInstance!.rate = rate;
    modal.componentInstance!.updateInfo = true;
    modal.componentInstance!.name = name;
  }

  authModal() {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: 'Авторизация',
      nzContent: AuthModalComponent,
      nzFooter: [
        {
          label: 'Отмена',
          shape: 'round',
          type: 'primary',
          onClick: () => {
            modal.destroy();
          },
        },
      ],
    });
  }
}
