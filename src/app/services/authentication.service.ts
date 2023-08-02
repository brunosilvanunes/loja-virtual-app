import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { AuthenticationClient } from '../client/authenticationClient';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { Authorization } from '../model/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenKey = 'token';

  constructor(
    private client: AuthenticationClient,
    private router: Router
  ) { }

  login(user: User) {
    return this.client.login(user)
      .subscribe((data) => {
        if (data.body?.token != null) {
          localStorage.setItem(this.tokenKey, data?.body?.token);
          console.log(localStorage);
        }
      });
  }

  public register(user: User): void {
    this.client.register(user)
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/login'])
      });
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);

    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
