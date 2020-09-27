import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routes } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { InvoiceComponent } from './reports/invoice/invoice.component';
import { BillingDateSelectionComponent } from './reports/templ/billing-date-selection/billing-date-selection.component';
import { SummaryInfoComponent } from './reports/templ/summary-info/summary-info.component';
import { InvoiceListComponent } from './reports/templ/invoice-list/invoice-list.component';
import { ScheduleEditComponent } from './schedules/schedule-edit/schedule-edit.component';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { ModalSetExitComponent } from '../common/modal-set-exit/modal-set-exit.component';
// import { SplitPipe } from '../common/split.pipe';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    InvoiceComponent,
    BillingDateSelectionComponent,
    SummaryInfoComponent,
    InvoiceListComponent,
    ScheduleEditComponent,
    ScheduleListComponent,
    ModalSetExitComponent,
    // SplitPipe
  ],
  imports: [
    CommonModule,
    //FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AdminModule { }