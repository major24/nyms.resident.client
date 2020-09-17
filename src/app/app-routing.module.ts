import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './common/login/login.component';
import { HomeComponent } from './common/home/home.component';
import { DashboardResidentsComponent } from './residents/dashboard-residents/dashboard-residents.component';
import { EnquiresComponent } from './residents/enquires/enquires.component';
import { EnquiresEditComponent } from './residents/enquires/enquires-edit/enquires-edit.component';
import { InvoiceComponent } from './admin/reports/invoice/invoice.component';

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
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthAdminGuard]
    },
    {
        path: 'invoice',
        component: InvoiceComponent,
        canActivate: [AuthAdminGuard]
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