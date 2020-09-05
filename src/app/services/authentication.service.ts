import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment'; // '@environments/environment';
import { User } from '../models/index'; // '@app/models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private apiService: ApiService
  ) {}


  logout() {
    this.clearStorage();
    this.router.navigate(['/login']);
  }

  clearStorage() {
    localStorage.removeItem('tokenId');
  }

  public isLoggedIn() {
    return !this.isTokenExpired();
  }

  public getToken(): string {
    return localStorage.getItem('tokenId');
  }

  public hasToken(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public readToken(): any {
    return this.jwtHelper.decodeToken(this.getToken());
  }

  public getTokenExpirationDate(): any {
    return this.jwtHelper.getTokenExpirationDate(this.getToken());
  }

  public isTokenExpired(): boolean {
    if (this.getTokenExpirationDate() != null) {
      return !this.jwtHelper.isTokenExpired(this.getToken());
    }
    return true;
  }

  public getUserReferenceIdFromToken() {
    const tkn = this.getToken();
    if (tkn) {
      const decToken = this.readToken();
      return decToken.unique_name;
    }
    return throwError('Reference Id not found in token');
  }

}












/**
 *
 *   refreshToken() {
    console.log('>>> calling refresh token in auth service.');
    return this.http
      .post<any>(
        `${environment.apiDomainUrl}/api/authentication/refresh-token`,
        {},
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          this.setSession(user);
          return user;
        })
      );
  }

  isLoggedInAtServer(username: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${environment.apiDomainUrl}/api/authentication/logged-in-at-server`,
      { username },
      { withCredentials: true }
    );
  }
 */