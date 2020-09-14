import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptorNoRefresh } from './helpers';
// import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './common/login/login.component';
// import { UsersComponent } from './users/users.component';
// import { WeatherComponent } from './weather/weather.component';
// import { FinanceComponent } from './finance/finance.component';
// import { ResidentsComponent } from './residents/residents.component';

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

export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    ResidentsListComponent
  ],
  providers: [
    //{ provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorNoRefresh, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
