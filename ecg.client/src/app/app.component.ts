import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SolidTireComfort } from './Models/solid-tire-comfort'

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  public solidTireComfort: SolidTireComfort[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
    this.getSolidTireComfort();
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/api/solidTireComfort/GetWeatherForecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSolidTireComfort() {
    this.http.get<SolidTireComfort[]>('/api/solidTireComfort/GetSolidTireComfort').subscribe(
      (result) => {
        this.solidTireComfort = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'ecg.client';
}
