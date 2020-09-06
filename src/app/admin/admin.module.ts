import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routes } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { InvoiceComponent } from './reports/invoice/invoice.component';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AdminModule { }