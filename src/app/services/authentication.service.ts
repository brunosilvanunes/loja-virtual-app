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

  public register(user: User): void {
    this.client.register(user).subscribe((token) => {
      localStorage.setItem(this.token, token);
      this.router.navigate(['/login'])
    },
    (error) => {
      console.log('ERRO ' + error);
    })
  }
}
