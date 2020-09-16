import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../services/index';
import { CareHomeUser } from '../../models/index';



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

}