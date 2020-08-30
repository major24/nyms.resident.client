import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'; // '@environments/environment';
import { User } from '../models'; // '@app/models';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Store } from '../helpers/store';

@Injectable({ providedIn: 'root' })
export class UserService extends Store<User> {

  constructor(private apiService: ApiService, private authService: AuthenticationService) {
    super(null)
  }

  public login(username: string, password: string) {
    console.log('!!===', this.getValue());
    return this.authService.login(username, password)
    .pipe(
      map((user) => {
        console.log('>>inUserService-ready to set user state', user);
        this.setState(user);
        //console.log('===', this.getValue());
        //this.userSubject.next(user);
        //this.setUserRoleValues(user);
        return user;
      })
    );
  }

  // API calls
  public reloadUser() {
    const referenceId = this.authService.getUserReferenceIdFromToken(); //.getUserIdFromToken();
    return this.apiService.getUserByReferenceId(referenceId)       //.getUserById(id)
    .pipe(
      map((user) => {
        //console.log('setting state', user);
        this.setState(user);
        return user;
      })
    )
  }

  public getStoreUser(): User {
    return this.getValue();
  }

  public hasUserToken(): boolean {
    return this.authService.hasToken();
  }

  public logout(): void {
    // this.userRolesSubject.next([]);
    // this.userSubject.next(null);
    this.authService.logout();
  }

}










/*
export class UserService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  private userRolesSubject: BehaviorSubject<string[]>;
  public userRoles: Observable<string[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    this.userRolesSubject = new BehaviorSubject<string[]>([]);
    this.userRoles = this.userRolesSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get userRoleValues(): string[] {
    return this.userRolesSubject.value;
  }

  private setUserRoleValues(user: User) {
    let roles = user.roles.map((r) => {
      return r.name;
    });
    this.userRolesSubject.next(roles);
  }

  public login(username: string, password: string): Observable<User> {
    return this.authService.login(username, password).pipe(
      map((user) => {
        this.userSubject.next(user);
        this.setUserRoleValues(user);
        return user;
      })
    );
  }

  public hasUserToken(): boolean {
    return this.authService.hasToken();
  }

  public isInRole(role: string): boolean {
    return this.userRoleValues.some((r) => r === role);
  }

  public logout(): void {
    this.userRolesSubject.next([]);
    this.userSubject.next(null);
    this.authService.logout();
  }

  // API calls
  public reloadUser() {
    const id = this.authService.getUserIdFromToken();
    return this.http
      .get<User>(`${environment.apiDomainUrl}/api/users/${id}`)
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          this.setUserRoleValues(user);
          return user;
        })
      );
  }

  public getAll() {
    return this.http.get<User[]>(`${environment.apiDomainUrl}/api/users`);
  }

}
*/