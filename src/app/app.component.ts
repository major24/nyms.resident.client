import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/index';
import { UserService } from '../app/services/index';
import { CareHomeUser } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nyms-care-client';
  user: CareHomeUser;

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService) {}

  ngOnInit(): void {

  }

  get isLoggedIn() {
    if (this.authenticationService.getToken()){
      this.user = this.userService.getStoreUser();
      return true;
    }
    return false;
  }

  get isAuthorized() {
    return this.userService.isInRole('Admin') || this.userService.isInRole('Manager');;
  }

  get isAdmin() {
    return this.userService.isInRole('Admin');
  }

  logout(): void {
    this.user = null;
    this.userService.logout();
  }


}
