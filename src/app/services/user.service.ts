import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'; // '@environments/environment';
import { User, CareHomeUser } from '../models'; // '@app/models';
import { AuthenticationService } from './authentication.service';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { map, tap, concatMap, mergeMap, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Store } from '../helpers/store';
import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { userInfo } from 'os';

@Injectable({ providedIn: 'root' })
export class UserService extends Store<CareHomeUser> {

  constructor(private apiService: ApiService, private authService: AuthenticationService) {
    super(null)
  }

  public login(username: string, password: string): Observable<CareHomeUser> {
    console.log('>>initiate login for ', username);

    return this.apiService.authenticateUser(username, password)
    .pipe(
        tap(res => console.log('step1-login', res)),
        mergeMap(guser => this.setLocalStorageToken(guser)),
        mergeMap(guser => this.apiService.getCareHomeUserByReferenceId(guser.referenceId)),
        mergeMap(guser => this.setStoreState(guser)),
        map((u) => { return u } )
    );
  }


  setLocalStorageToken(authUserResult: User): Observable<User> {
    console.log('setting token');
    localStorage.setItem('tokenId', authUserResult.jwtToken);
    return of(authUserResult);
  }

  public setStoreState(user: CareHomeUser): Observable<CareHomeUser> {
    console.log('setting CHUser state', user);
    this.setState(user);
    return of(user);
  }


  // public login(username: string, password: string) {
  //   console.log('>>initiate login for ', username);
  //   return this.authService.login(username, password)
  //   .pipe(
  //     map((user) => {
  //       console.log('>>login is success.', user);
  //       // this.setState(user);
  //       // console.log('===refid', this.authService.getUserReferenceIdFromToken());
  //       //this.userSubject.next(user);
  //       //this.setUserRoleValues(user);
  //       return user;
  //     })
  //   );
  // }



  // API calls
  // used to be reloaduser()...
  public reloadUser(): Observable<CareHomeUser> {
    const referenceId = this.authService.getUserReferenceIdFromToken();
    console.log('>>reloading carehomeuser for ', referenceId);

    return this.apiService.getCareHomeUserByReferenceId(referenceId)
    .pipe(
        tap(res => console.log('step1-reload', res)),
        mergeMap(guser => this.setStoreState(guser)),
        map((u) => { return u } )
    );
  }

  // public reloadUser() {     //loadCareHomeUser() {
  //   const referenceId = this.authService.getUserReferenceIdFromToken(); //.getUserIdFromToken();
  //   console.log('>>fetching carehomeuser');
  //   return this.apiService.getCareHomeUserByReferenceId(referenceId)       //.getUserById(id)
  //   .pipe(
  //     map((user) => {
  //       console.log('setting state with care home user', user);
  //       this.setState(user);
  //       return user;
  //     })
  //   )
  // }



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
      return this.getStoreUser().careHomeRoles.some((r => r.roleName === role))
    }
    return false;
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