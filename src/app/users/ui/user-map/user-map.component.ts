import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  Icon,
  LatLng,
  LatLngExpression,
  Layer,
  Map,
  MapOptions,
  Popup,
  circle,
  control,
  divIcon,
  icon,
  latLng,
  marker,
  polygon,
  tileLayer,
} from 'leaflet';
import { User } from 'src/app/shared/data-access/api/models';

@Component({
  selector: 'app-user-map',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMapComponent implements OnInit {
  @Input({ required: true }) user!: User;

  #cdr = inject(ChangeDetectorRef);

  map!: Map;
  options!: MapOptions;
  userLocation: LatLngExpression = [40.7128, -74.006]; // Default user location (New York)
  markerIcon!: Icon;
  markers: Layer[] = [];

  ngOnInit(): void {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '',
        }),
      ],
      zoom: 13,
      center: this.userLocation,
    };

    this.markerIcon = icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    });
  }

  onMapReady(map: Map) {
    this.map = map;

    this.userLocation = new LatLng(
      parseFloat(this.user?.location?.coordinates?.latitude),
      parseFloat(this.user?.location?.coordinates?.longitude)
    );

    let photo = new Popup({ autoClose: false });
    photo.setLatLng(this.userLocation);
    photo.setContent(`
      <div style="display: flex; flex-direction: column;	align-items: center;margin-top: 25px;">
        <image src=${this.user?.picture?.large} style="border-radius: 50%;" width="75"/>
        <p style="font-size: 12px;font-weight: bold;">${this.user?.name?.title} ${this.user?.name?.first} ${this.user?.name?.last}</p>
      </div>
    `);

    const newMarker = marker(this.userLocation, { icon: this.markerIcon });
    this.markers.push(newMarker);

    this.map.panTo(this.userLocation);
    newMarker.addTo(this.map).bindPopup(photo).openPopup();
    this.#cdr.markForCheck();
  }
}
