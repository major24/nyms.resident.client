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
    const tokenRoles = this.userService.getUserRolesFromToken();
    if (Array.isArray(tokenRoles) && tokenRoles.length > 0) {
      if (tokenRoles.includes('Admin') || tokenRoles.includes('Manager')) {
        return true;
      }
    }
    return false;
  }

  get isAdmin() {
    const tokenRoles = this.userService.getUserRolesFromToken();
    if (Array.isArray(tokenRoles) && tokenRoles.length > 0) {
      if (tokenRoles.includes('Admin')) {
        return true;
      }
    }
    return false;
  }

  logout(): void {
    this.user = null;
    this.userService.logout();
  }


}
