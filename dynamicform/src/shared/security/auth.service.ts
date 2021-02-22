import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { map, catchError, retry, share, shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { PageNodeModel, RecordIdentifier } from '@shared/page-node-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<RecordIdentifier>('/api/login', { email, password })
      .pipe(
        tap(res => this.setSession),
        shareReplay()
      );
  }

  private setSession(authResult) {
    //const expiresAt = moment().add(authResult.expiresIn, 'second');
    //TODO: client or server side to control expiration period. 
    const expiresAt = new Date(authResult.expiresIn);

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    //return moment().isBefore(this.getExpiration());
    const now = new Date();
    return now <= this.getExpiration();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    //return moment(expiresAt);
    return new Date(expiresAt);
  }

  getAuthorizationToken() {
    //return 'some-auth-token';
    return localStorage.getItem("id_token");
  }

}
