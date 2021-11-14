import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../app/services/user.service';

@Component({
  selector: 'app-dashboard-user-actions',
  templateUrl: './dashboard-user-actions.component.html',
  styleUrls: ['./dashboard-user-actions.component.css']
})
export class DashboardUserActionsComponent implements OnInit {
  loading: boolean = false;
  showAuditActionsButton: boolean = false;
  ROLE_ID_MEETING_ACTION_AUDITORS: number = 6; //  = Auditors

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.hasAccess(this.ROLE_ID_MEETING_ACTION_AUDITORS)
  }

  hasAccess(roleId: number): void {
    this.loading = true;
    this.userService.hasAccessToRole(roleId)
      .subscribe({
        next: (data) => {
          this.showAuditActionsButton = data;
          console.log(`loaded has access to roleid: ${roleId} - ${data}`);
          this.loading = false;
        },
        error: (error) => {
          console.log('Error checking hasAccess role ', error);
          this.loading = false;
        }
      });
  }

  navToUserBudgets(): void {
    this.router.navigate(['/user/budgets-list', {}]);
  }

  navToUserSpends(): void {
    this.router.navigate(['/user/spends-list', {}]);
  }

  navToUserMeetings(): void {
    this.router.navigate(['/user/meetings-list', {}]);
  }

  navToUserPendingActions(): void {
    this.router.navigate(['/user/actions-pending-list', {}]);
  }

  navToUserAuditActions(): void {
    this.router.navigate(['/user/actions-audit-list',  {}]);
  }

}
