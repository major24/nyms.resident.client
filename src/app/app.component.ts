import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/index';
import { UserService } from '../app/services/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nyms-care-client';

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService) {}

  ngOnInit(): void {

  }

  get isLoggedIn() {
    if (this.authenticationService.getToken()){
      return true;
    }
    return false;
  }

  get isAuthorized() {
    //if (this.userService.isInRole('Manager') || this.userService.isInRole('Admin')) {
      return true;
    //}
    //return false;
  }

  get isAdmin() {
    //return this.userService.isInRole('Admin');
    return true;
  }

  logout(): void {
    this.userService.logout();
  }


}
