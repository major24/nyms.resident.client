import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptorNoRefresh } from './helpers';

import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './common/login/login.component';

import { DashboardResidentsComponent } from './residents/dashboard-residents/dashboard-residents.component';
import { EnquiresComponent } from './residents/enquires/enquires.component';
import { EnquiresEditComponent } from './residents/enquires/enquires-edit/enquires-edit.component';
import { EnquiresListComponent } from './residents/enquires/enquires-list/enquires-list.component';
import { AddressEditComponent } from './residents/templ-edit/address-edit/address-edit.component';
import { ResidentProfileEditComponent } from './residents/templ-edit/resident-profile-edit/resident-profile-edit.component';
import { SocialWorkerDetailEditComponent } from './residents/templ-edit/social-worker-detail-edit/social-worker-detail-edit.component';
import { CareTypeEditComponent } from './residents/templ-edit/care-type-edit/care-type-edit.component';
import { RoomLocationEditComponent } from './residents/templ-edit/room-location-edit/room-location-edit.component';
import { EnquiryMiscEditComponent } from './residents/templ-edit/enquiry-misc-edit/enquiry-misc-edit.component';
import { ResidentsListComponent } from './residents/residents-list/residents-list.component';
import { MainPipe } from './main-pipe.module';
import { AccessDeniedComponent } from './common/errors/access-denied/access-denied.component';
import { ServerErrorComponent } from './common/errors/server-error/server-error.component';
import { EnquiryActionsComponent } from './residents/templ-edit/enquiry-actions/enquiry-actions.component';
import { ResidentEditComponent } from './residents/resident-edit/resident-edit.component';
import { NextOfKinComponent } from './residents/templ-edit/next-of-kin/next-of-kin.component';
import { ContactInfoComponent } from './residents/templ-edit/contact-info/contact-info.component';
import { ReferralInfoComponent } from './residents/templ-edit/referral-info/referral-info.component';
import { ResidentEditSummaryComponent } from './residents/templ-edit/resident-edit-summary/resident-edit-summary.component';
import { MdateModule } from './residents/templ-edit/mdate/mdateModule';
import { ResidentMiscEditComponent } from './residents/templ-edit/resident-misc-edit/resident-misc-edit.component';
import { DashboardUserActionsComponent } from './user-actions/dashboard-user-actions/dashboard-user-actions.component';
import { SpendsListComponent } from './user-actions/spends/spends-list/spends-list.component';
import { UserBudgetsListComponent } from './user-actions/spends/budgets/user-budgets-list/user-budgets-list.component';
import { EnumKeyValuePipe } from './enum-keyvalue.pipe';
import { MeetingsListComponent } from './user-actions/meetings/meetings-list/meetings-list.component';
import { MeetingsEditComponent } from './user-actions/meetings/meetings-edit/meetings-edit.component';
import { Mdatev2Component } from './common/templates/mdatev2/mdatev2.component';
import { SharedModule } from '../app/shared/shared.module';
import { MeetingCreateComponent } from './user-actions/meetings/meeting-create/meeting-create.component';
import { ActionsPendingListComponent } from './user-actions/meetings/actions-pending-list/actions-pending-list.component';
import { ActionsAuditListComponent } from './user-actions/meetings/actions-audit-list/actions-audit-list.component';

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MainPipe,
    MdateModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT'
      }
    })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardResidentsComponent,
    EnquiresComponent,
    EnquiresEditComponent,
    EnquiresListComponent,
    AddressEditComponent,
    ResidentProfileEditComponent,
    SocialWorkerDetailEditComponent,
    CareTypeEditComponent,
    RoomLocationEditComponent,
    EnquiryMiscEditComponent,
    ResidentsListComponent,
    AccessDeniedComponent,
    ServerErrorComponent,
    EnquiryActionsComponent,
    ResidentEditComponent,
    NextOfKinComponent,
    ContactInfoComponent,
    ReferralInfoComponent,
    ResidentEditSummaryComponent,
    ResidentMiscEditComponent,
    DashboardUserActionsComponent,
    SpendsListComponent,
    UserBudgetsListComponent,
    EnumKeyValuePipe,
    MeetingsListComponent,
    MeetingsEditComponent,
    Mdatev2Component,
    MeetingCreateComponent,
    ActionsPendingListComponent,
    ActionsAuditListComponent,
  ],
  providers: [
    //{ provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorNoRefresh, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
