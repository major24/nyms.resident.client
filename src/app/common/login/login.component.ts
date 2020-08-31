import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap, mergeMap } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../../services/index';
import { CareHomeUser, User } from '../../models/index';import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  user: CareHomeUser;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.user = this.userService.getStoreUser();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.submitted = true;
    this.userService.login(this.f.username.value, this.f.password.value)
    .subscribe(
      data => {
        console.log('>>now fetch the carehomeuser for ', data);
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log('>>Error loggin in ', error);
        this.error = error;
      }
    );
  }






















      // const url = '/api/authentication/authenticate';
    // const username: string = this.f.username.value;
    // const password: string = this.f.password.value;
    // this.loading = true;

    // this.http.post<User>(url,
    //   { username, password },
    //   { withCredentials: true }
    // )
    // .pipe(
    //     tap(res => console.log('step1', res)),
    //     mergeMap(guser => this.setStorage(guser)),
    //     mergeMap(guser => this.http.get<CareHomeUser>(
    //                 `/api/users/carehomeusers/${guser.referenceId}`,
    //                 { withCredentials: true }
    //           )),
    //     mergeMap(guser => this.userService.setStoreState(guser))
    //   ).subscribe(
    //     fin => {
    //       console.log('fin', fin);
    //       this.loading = false;
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => console.log('>>Error login user', error));
  // setStorage(authUserResult): Observable<User> {
  //   console.log('setting token');
  //   localStorage.setItem('tokenId', authUserResult.jwtToken);
  //   return of(authUserResult);
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //       return;
  //   }
  //   this.loading = true;
  //   console.log('>>>in loging comp0');
  //   this.userService.login(this.f.username.value, this.f.password.value)
  //   .subscribe(
  //     data => {
  //       console.log('>>now fetch the carehomeuser for ', data);
  //       // if user found, then get CareHomeUser and set to store...
  //       this.loading = false;
  //       this.router.navigate([this.returnUrl]);
  //       // this.userService.reloadUser().subscribe(chu => {
  //       //   ne => {
  //       //     console.log('>>??', ne);
  //       //     this.loading = false;
  //       //     this.router.navigate([this.returnUrl]);
  //       //   }
  //       //   error => console.log('errpr')

  //       // });
  //     },
  //     error => {
  //       console.log('>>>Error:', error);
  //       this.loading = false;
  //     }
  //   );
  // }
}









    // // this.authenticationService.login(this.f.username.value, this.f.password.value)
    // this.userService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe({
    //         next: () => {
    //           console.log('>>>in loging comp1', this.userService.userValue);
    //           // this.userService.getRoles(1);
    //           this.router.navigate([this.returnUrl]);
    //         },
    //         error: error => {
    //             this.error = error;
    //             this.loading = false;
    //         }
    //     });