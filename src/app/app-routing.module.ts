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
        path: 'residents',
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