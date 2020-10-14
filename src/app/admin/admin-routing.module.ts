import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AuthAdminGuard } from '../helpers/auth-admin.guard';

export const routes: Routes = [
    {
        path: '',
        component: DashboardAdminComponent,
        canActivate: [AuthAdminGuard]
    }
];