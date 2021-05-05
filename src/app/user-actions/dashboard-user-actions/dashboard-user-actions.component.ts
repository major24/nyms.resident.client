import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user-actions',
  templateUrl: './dashboard-user-actions.component.html',
  styleUrls: ['./dashboard-user-actions.component.css']
})
export class DashboardUserActionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navToUserBudgets(): void {
    this.router.navigate(['/user/budgets-list', {}]);
  }

  navToUserSpends(): void {
    this.router.navigate(['/user/spends-list', {}]);
  }

}
