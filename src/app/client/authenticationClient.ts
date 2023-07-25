import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {

  constructor(
    private http: HttpClient
  ) {}

  public register(user: User): Observable<string> {
    return this.http.post<string>(
      environment.url + '/user/register',
      { user },
      { responseType: "json" }
    );
  }

}
