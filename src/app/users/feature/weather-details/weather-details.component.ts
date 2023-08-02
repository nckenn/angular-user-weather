import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@ngneat/dialog';
import { UserService } from '../../data-access/user.service';
import {
  User,
  WeatherResponse,
  CurrentWeather,
  Daily,
  Hourly,
} from 'src/app/shared/data-access/api/models';
import { map } from 'rxjs';
import { ICON_MAP } from '../../utils/icon-map';

interface Data {
  user: User;
}

@Component({
  selector: 'app-weather-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDetailsComponent {
  #cdr = inject(ChangeDetectorRef);
  #ref: DialogRef<Data, boolean> = inject(DialogRef);
  #userApi = inject(UserService);

  currentUser = this.#ref.data.user;
  currentDate = new Date();

  weather$ = this.#userApi
    .getWeather(
      this.currentUser?.location?.coordinates?.latitude,
      this.currentUser?.location?.coordinates?.longitude
    )
    .pipe(
      map((data: WeatherResponse) => {
        return {
          current: this.parseCurrentWeather(data.current_weather, data.daily),
          hourly: this.parseHourlyWeather(data.hourly, data.current_weather),
        };
      })
    );

  closeDialog() {
    this.#ref.close();
    this.#cdr.markForCheck();
  }

  getIconUrl(iconCode: number | undefined) {
    return `./assets/icons/${ICON_MAP.get(iconCode)}.svg`;
  }

  parseCurrentWeather(current_weather: CurrentWeather, daily: Daily) {
    const { temperature: currentTemp, weathercode: iconCode } = current_weather;
    const {
      temperature_2m_max: [maxTemp],
      temperature_2m_min: [minTemp],
    } = daily;

    return {
      currentTemp: Math.round(currentTemp),
      highTemp: Math.round(maxTemp),
      lowTemp: Math.round(minTemp),
      iconCode,
    };
  }

  parseHourlyWeather(hourly: Hourly, current_weather: CurrentWeather) {
    return hourly.time
      .map((time, index) => {
        return {
          timestamp: time,
          iconCode: hourly.weathercode[index],
          temp: Math.round(hourly.temperature_2m[index]),
        };
      })
      .filter(({ timestamp }) => timestamp >= current_weather.time);
  }
}
