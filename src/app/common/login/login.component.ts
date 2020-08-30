import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService, AuthenticationService } from '../../services/index';

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

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
    console.log('>>>in loging comp0');
    this.userService.login(this.f.username.value, this.f.password.value)
    .subscribe(
      data => {
        // console.log('>>>', data);
        this.loading = false;
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log('>>>Error:', error);
        this.loading = false;
      }
    );
  }
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