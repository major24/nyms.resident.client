import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherForecast } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<WeatherForecast[]>(
      `${environment.apiDomainUrl}/api/weatherforecast`
    );
  }
}
