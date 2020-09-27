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

  navToInvoice(): void {
    this.router.navigate(['/invoice', {}]);
  }

  navToSchedules(): void {
    this.router.navigate(['/schedule-list', {}]);
  }

}
