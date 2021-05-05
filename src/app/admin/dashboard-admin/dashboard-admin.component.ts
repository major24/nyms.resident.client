import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private router: Router, ) { }

  ngOnInit(): void {
  }

  navToInvReportByDateRange(): void {
    this.router.navigate(['/report-by-date-range', {}]);
  }

  navToInvReportByBillingCycle(): void {
    this.router.navigate(['/report-by-billing-cycle', {}]);
  }

  navToSchedules(): void {
    this.router.navigate(['/schedule-list', {}]);
  }

  navToCategories(): void {
    this.router.navigate(['/admin/categories-list', {}]);
  }

  navToBudgets(): void {
    this.router.navigate(['/admin/budgets-list', {}]);
  }

}
