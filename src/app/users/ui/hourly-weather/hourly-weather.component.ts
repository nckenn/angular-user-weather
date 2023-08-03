import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICON_MAP } from '../../utils/icon-map';

@Component({
  selector: 'app-hourly-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.scss'],
})
export class HourlyWeatherComponent {
  @Input({ required: true }) hourlyWeather: any;

  getIconUrl(iconCode: number | undefined) {
    return `./assets/icons/${ICON_MAP.get(iconCode)}.svg`;
  }
}
