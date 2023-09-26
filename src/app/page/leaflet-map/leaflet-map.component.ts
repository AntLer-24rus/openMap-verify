import {Component} from '@angular/core';
import {finalize} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MapService} from 'src/app/services/map.service';
import {MarkerService} from 'src/app/api/services/marker.service';
import {CustomModalService} from 'src/app/services/custom-modal.service';

@UntilDestroy()
@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent {
  leafletOptions: L.MapOptions = this.mapService.mapOpt();
  houseNumber: number;
  road: string;
  nameAddress: string;
  isLoadingMapInit = true;

  constructor(
    private mapService: MapService,
    private markerService: MarkerService,
    private modalService: CustomModalService,
  ) {
  }

  onMapReady(map: L.Map) {
    this.markerService
      .getMarkers()
      .pipe(
        finalize(() => {
          this.isLoadingMapInit = false;
        }),
        untilDestroyed(this),
      )
      .subscribe((markers) => {
        this.mapService.initMap(map);
        markers.forEach((marker) => {
          this.mapService.addMarker(marker);
        });
      });
  }

  onClickMap(event: L.LeafletMouseEvent): void {
    this.mapService.onMapClick(event);
    this.mapService.getBuildingVertices(event);
  }

  openAuthModal(): void {
    this.modalService.authModal();
  }
}
