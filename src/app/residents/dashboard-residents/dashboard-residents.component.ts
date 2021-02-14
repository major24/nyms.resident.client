import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CareHomeUser } from '../../models/index';
import { UserService } from '../../services/index';

@Component({
  selector: 'app-dashboard-residents',
  templateUrl: './dashboard-residents.component.html',
  styleUrls: ['./dashboard-residents.component.css']
})
export class DashboardResidentsComponent implements OnInit {
  userFound: boolean;
  user: CareHomeUser;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    console.log('>>>dash-res');
    //=== reload user on refresh =====================================
    // if user token found and userValue is null, must be reloading or refreshing the page
    // in-memory user is removed. so re-load user
    if (this.userService.hasUserToken() && this.userService.getStoreUser() == null) {
      console.log('>>sesion found. user hit F5, so get user again.');
      this.userService.reloadUser().subscribe(u => {
        this.userFound = true;
        this.user = this.userService.getStoreUser();
      });
    } else {
      this.user = this.userService.getStoreUser();
    }
    this.userFound = this.userService.getStoreUser() != null;
    // ================================================================

  }

  navToEnquires(): void {
    this.router.navigate(['/enquires', {}]);
  }

  navActiveToResidents(): void {
    this.router.navigate(['/residents', 'active'])
  }

  navToAllResidents(): void {
    this.router.navigate(['/residents', 'all'])
  }

}
