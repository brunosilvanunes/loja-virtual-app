import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { WeatherClient } from '../client/weather.client';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css']
})
export class SecretComponent implements OnInit {

  public weather: Observable<any> = this.weatherClient.getWeatherData();

  constructor(
    private authenticationService: AuthenticationService,
    private weatherClient: WeatherClient
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
