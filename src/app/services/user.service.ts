import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // '@environments/environment';
import { User, CareHomeUser } from '../models';
import { AuthenticationService } from './authentication.service';
import { Observable, of } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Store } from '../helpers/store';


@Injectable({ providedIn: 'root' })
export class UserService extends Store<CareHomeUser> {

  constructor(private apiService: ApiService, private authService: AuthenticationService) {
    super(null)
  }

  public login(username: string, password: string): Observable<CareHomeUser> {
    console.log('>>initiate login for ', username);
    return this.apiService.authenticateUser(username, password)
    .pipe(
        tap(res => console.log('step1-login begins', res)),
        mergeMap(guser => this.setLocalStorageToken(guser)),
        mergeMap(guser => this.apiService.getCareHomeUserByReferenceId(guser.referenceId)),
        mergeMap(guser => this.setStoreState(guser)),
        map((u) => { return u } )
    );
  }


  setLocalStorageToken(authUserResult: User): Observable<User> {
    localStorage.setItem('tokenId', authUserResult.jwtToken);
    return of(authUserResult);
  }

  public setStoreState(user: CareHomeUser): Observable<CareHomeUser> {
    this.setState(user);
    return of(user);
  }


  // API calls
  public reloadUser(): Observable<CareHomeUser> {
    const referenceId = this.authService.getUserReferenceIdFromToken();

    return this.apiService.getCareHomeUserByReferenceId(referenceId)
    .pipe(
        tap(res => console.log('>>reloading user', res)),
        mergeMap(guser => this.setStoreState(guser)),
        map((u) => { return u } )
    );
  }


  public getStoreUser(): CareHomeUser {
    return this.getValue();
  }

  public hasUserToken(): boolean {
    return this.authService.hasToken();
  }

  public logout(): void {
    this.setState(null);
    this.authService.logout();
  }

  public isInRole(role: string): boolean {
    if (this.getStoreUser()) {
      return this.getStoreUser().careHomeRoles.some((r => r.name === role))
    }
    return false;
  }

  public getUserRolesFromToken() {
    return this.authService.getUserRolesFromToken();
  }

  public isInRoleFromToken(role: string): boolean {
    const tokenRoles = this.getUserRolesFromToken();
    if (Array.isArray(tokenRoles) && tokenRoles.length > 0) {
      if (tokenRoles.includes(role)) {
        return true;
      }
    }
    return false;
  }


}

