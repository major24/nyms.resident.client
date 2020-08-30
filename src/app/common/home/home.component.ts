import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/index';
import { User } from '../../models/index';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // local var ref, store value
  isLoading: boolean;
  userFound: boolean;
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('>>p>>p>>', this.userService.getStoreUser());
    //=== reload user on refresh =====================================
    // if user token found and userValue is null, must be reloading or refreshing the page
    // in-memory user is removed. so re-load user
    if (this.userService.hasUserToken() && this.userService.getStoreUser() == null) {
      this.isLoading = true;
      this.userService.reloadUser().subscribe(u => {
        this.user = u;
        this.userFound = true;
        this.isLoading = false;
      });
    } else {
      this.user = this.userService.getStoreUser();
    }
    this.userFound = this.userService.getStoreUser() != null;
    // ================================================================

    // do other init for home page

  }

}
