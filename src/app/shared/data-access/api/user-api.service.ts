import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_API_URL } from './api-url.token';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(
    private http: HttpClient,
    @Inject(USER_API_URL) private api_url: string
  ) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.api_url}${url}`, {
      headers: this.headers,
      params,
    });
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
