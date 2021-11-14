import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './common/home/home.component';
import { DashboardResidentsComponent } from './residents/dashboard-residents/dashboard-residents.component';
import { EnquiresComponent } from './residents/enquires/enquires.component';
import { EnquiresEditComponent } from './residents/enquires/enquires-edit/enquires-edit.component';
import { ReportByDateRangeComponent } from './admin/reports/report-by-date-range/report-by-date-range.component';
import { ReportByBillingCycleComponent } from './admin/reports/report-by-billing-cycle/report-by-billing-cycle.component';
import { ScheduleEditComponent } from './admin/schedules/schedule-edit/schedule-edit.component';
import { ScheduleListComponent } from './admin/schedules/schedule-list/schedule-list.component';
import { AccessDeniedComponent } from './common/errors/access-denied/access-denied.component';
import { ServerErrorComponent } from './common/errors/server-error/server-error.component';
import { EnquiryActionsComponent } from './residents/templ-edit/enquiry-actions/enquiry-actions.component';
import { AuthGuard, AuthResidentsGuard, AuthAdminGuard } from './helpers';
import { ResidentsListComponent } from './residents/residents-list/residents-list.component';
import { ResidentEditComponent } from './residents/resident-edit/resident-edit.component';

import { DashboardUserActionsComponent } from './user-actions/dashboard-user-actions/dashboard-user-actions.component';
import { CategoriesListComponent } from './admin/spends/categories/categories-list/categories-list.component';
import { BudgetsListComponent } from './admin/spends/budgets/budgets-list/budgets-list.component';
import { SpendsListComponent } from './user-actions/spends/spends-list/spends-list.component';
import { BudgetsEditComponent } from './admin/spends/budgets/budgets-edit/budgets-edit.component';
import { UserBudgetsListComponent } from './user-actions/spends/budgets/user-budgets-list/user-budgets-list.component';
import { MeetingCategoryListComponent } from './admin/meetings/categories/meeting-category-list/meeting-category-list.component';
import { MeetingsEditComponent } from './user-actions/meetings/meetings-edit/meetings-edit.component';
import { MeetingsListComponent } from './user-actions/meetings/meetings-list/meetings-list.component';
import { MeetingCategoryEditComponent } from './admin/meetings/categories/meeting-category-edit/meeting-category-edit.component';
import { MeetingCreateComponent } from './user-actions/meetings/meeting-create/meeting-create.component';
import { ActionsPendingListComponent } from './user-actions/meetings/actions-pending-list/actions-pending-list.component';
import { ActionsAuditListComponent } from './user-actions/meetings/actions-audit-list/actions-audit-list.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'residents-dashboard',
        component: DashboardResidentsComponent,
        canActivate: [AuthResidentsGuard],
        // resolve: { mydata: AuthResidentsResolver }
    },
    {
        path: 'residents/:activeorall',
        component: ResidentsListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'enquires',
        component: EnquiresComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'enquires-edit/:referenceId',
        component: EnquiresEditComponent
    },
    {
        path: 'enquires-add',
        component: EnquiresEditComponent
    },
    {
        path: 'residents-admit/:referenceId',
        component: ResidentEditComponent
    },
    {
        path: 'residents-edit/:referenceId',
        component: ResidentEditComponent
    },
    {
        path: 'enquires-action/:referenceId',
        component: EnquiryActionsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthAdminGuard]
    },
    {
        path: 'report-by-date-range',
        component: ReportByDateRangeComponent,
        canActivate: [AuthAdminGuard]
    },
    {
        path: 'report-by-billing-cycle',
        component: ReportByBillingCycleComponent,
        canActivate: [AuthAdminGuard]
    },
    {
        path: 'schedule-list',
        component: ScheduleListComponent,
        canActivate: [AuthAdminGuard]
    },
    {
        path: 'schedule-edit/:referenceId',
        component: ScheduleEditComponent,
        canActivate: [AuthAdminGuard]
    },
    {
        path: 'user-actions-dashboard',
        component: DashboardUserActionsComponent
    },
    {
        path: 'admin/categories-list',
        component: CategoriesListComponent
    },
    {
        path: 'admin/budgets-list',
        component: BudgetsListComponent
    },
    {
        path: 'admin/budgets-add',
        component: BudgetsEditComponent
    },
    {
        path: 'admin/budgets-edit/:referenceId',
        component: BudgetsEditComponent
    },
    {
        path: 'admin/meeting-category-list',
        component: MeetingCategoryListComponent,
        canActivate: [AuthAdminGuard]
    },
    {
        path: 'admin/meeting-category-edit',
        component: MeetingCategoryEditComponent
    },
    {
        path: 'user/actions-pending-list',
        component: ActionsPendingListComponent,
    },
    {
        path: 'user/actions-audit-list',
        component: ActionsAuditListComponent
    },
    {
        path: 'user/spends-list/:referenceId',
        component: SpendsListComponent
    },
    {
        path: 'user/budgets-list',
        component: UserBudgetsListComponent
    },
    {
        path: 'user/meetings-list',
        component: MeetingsListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/meetings-create',
        component: MeetingCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user/meetings-edit/:referenceId',
        component: MeetingsEditComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'server-error',
        component: ServerErrorComponent
    },
    {
        path: 'access-denied',
        component: AccessDeniedComponent
    },
    // // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers:[]
})
export class AppRoutingModule { }