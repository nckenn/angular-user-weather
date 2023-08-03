import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICON_MAP } from '../../utils/icon-map';
import { User } from 'src/app/shared/data-access/api/models';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent {
  @Input({ required: true }) currentUser!: User;
  @Input({ required: true }) currentWeather: any;

  currentDate = new Date();

  getIconUrl(iconCode: number | undefined) {
    return `./assets/icons/${ICON_MAP.get(iconCode)}.svg`;
  }
}
