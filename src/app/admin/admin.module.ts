import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { routes } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

@NgModule({
  declarations: [
    DashboardAdminComponent
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AdminModule { }