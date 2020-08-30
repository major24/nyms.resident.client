import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/index';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-dashboard-residents',
  templateUrl: './dashboard-residents.component.html',
  styleUrls: ['./dashboard-residents.component.css']
})
export class DashboardResidentsComponent implements OnInit {
  userFound: boolean;
  user: User;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    console.log('>>>dash-res');
    //=== reload user on refresh =====================================
    // if user token found and userValue is null, must be reloading or refreshing the page
    // in-memory user is removed. so re-load user
    if (this.userService.hasUserToken() && this.userService.getStoreUser() == null) {
      this.userService.reloadUser().subscribe(u => {
        this.user = u;
        this.userFound = true;
      });
    } else {
      this.user = this.userService.getStoreUser();
    }
    this.userFound = this.userService.getStoreUser() != null;
    // ================================================================


  }

  navToEnquires(): void {
    this.router.navigate(['/enquires', {} ]);
  }

}
