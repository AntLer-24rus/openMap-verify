import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  createMarkerBody,
  markerTransformer,
  patchMarkerBody,
  TCreateMarkerBody,
  TMarker,
  TMarkerDTO,
  TPatchMarker,
  TPatchMarkerBody,
  TPatchMarkerDTO,
} from '../interfaces/marker.interface';
import {catchError, map, Observable, throwError} from 'rxjs';
import {MARKER, MARKERS} from '../const/api.const';
import {Router} from '@angular/router';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _modalService: NzModalService,
  ) {
  }

  errorMessageModal(): void {
    const modal: NzModalRef = this._modalService.create({
      nzTitle: 'Ошибка!!!',
      nzContent: 'Сервер не отвечает, повторите попытку позже!!!',
      nzFooter: [],
      nzClosable: false,
      nzMaskClosable: false,
    });
  }

  createMarker(data: TCreateMarkerBody): Observable<TMarker> {
    const body = createMarkerBody(data);
    return this._http
      .post<TMarkerDTO>(MARKERS, body)
      .pipe(map(markerTransformer));
  }

  getMarkers(): Observable<TMarker[]> {
    return this._http.get<TMarkerDTO[]>(MARKERS).pipe(
      map((groupedMarkers) => groupedMarkers.map(markerTransformer)),
      catchError(this._handleError),
    );
  }

  getMarkerById(_id: string): Observable<TMarker> {
    return this._http
      .get<TMarkerDTO>(MARKER(_id.toString()))
      .pipe(map(markerTransformer), catchError(this._handleError));
  }

  patchMarkerById(
    _id: string,
    data: TPatchMarkerBody,
  ): Observable<TPatchMarker> {
    const body = patchMarkerBody(data);
    return this._http
      .patch<TPatchMarkerDTO>(MARKER(_id.toString()), body)
      .pipe(map(patchMarkerBody));
  }

  private _handleError = (error: HttpErrorResponse) => {
    if (error.status === 400 || error.status === 404) {
      this._router.navigate(['/404']);
    }
    return throwError(() => {
      this.errorMessageModal();
    });
  };
}
