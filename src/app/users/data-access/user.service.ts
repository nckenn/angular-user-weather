import { HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherResponse } from 'src/app/shared/data-access/api/models';
import { UsersResponse } from 'src/app/shared/data-access/api/models/user.interface';
import { UserApiService } from 'src/app/shared/data-access/api/user-api.service';
import { WeatherApiService } from 'src/app/shared/data-access/api/weather-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #userApi = inject(UserApiService);
  #weatherApi = inject(WeatherApiService);

  getRandomUsers(page: number): Observable<UsersResponse> {
    return this.#userApi.get(`/?page=${page}&results=12`);
  }

  getWeather(latitude: string, longitude: string): Observable<WeatherResponse> {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return this.#weatherApi.get(
      `/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode&&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=${timezone}`
    );
  }
}
