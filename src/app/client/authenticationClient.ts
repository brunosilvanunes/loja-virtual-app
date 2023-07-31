import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Observable, first } from "rxjs";
import { environment } from "src/environments/environment";
import { Authorization } from "../model/authorization";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {

  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private http: HttpClient
  ) { }

  public login(user: User): Observable<HttpResponse<Authorization>> {

    return this.http.post<Authorization>(
      `${environment.url}/login`,
      user,
      { headers: this.headers, observe: 'response' });
  }

  public register(user: User): Observable<string> {
    let json = JSON.stringify(user);

    return this.http.post<string>(
      environment.url + '/user/register',
      { json }
    );
  }

}
