import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { AuthenticationClient } from '../client/authenticationClient';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token = 'token';

  constructor(
    private client: AuthenticationClient,
    private router: Router
  ) { }

  login(user: User) {
    this.client.login(user).subscribe((token) => {
      localStorage.setItem(this.token, token);

      console.log(`TOKEN ${this.token}`);
    },
      (error: Error) => {
        console.log('Email ou Senha incorreta!' + JSON.parse(error.message));
      });
  }

  public register(user: User): void {
    this.client.register(user).subscribe((token) => {
      localStorage.setItem(this.token, token);
      console.log(`TOKEN ${this.token}`);
      this.router.navigate(['/login'])
    },
      (error) => {
        console.log('ERRO ' + error);
      })
  }

  public logout(): void {
    localStorage.removeItem(this.token);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.token);

    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.token) : null;
  }
}
