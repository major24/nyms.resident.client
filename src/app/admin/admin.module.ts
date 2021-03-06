import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routes } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { BillingDateSelectionComponent } from './reports/templ/billing-date-selection/billing-date-selection.component';
import { SummaryInfoComponent } from './reports/templ/summary-info/summary-info.component';
import { ScheduleEditComponent } from './schedules/schedule-edit/schedule-edit.component';
import { ScheduleListComponent } from './schedules/schedule-list/schedule-list.component';
import { ModalSetExitComponent } from '../common/modal-set-exit/modal-set-exit.component';
import { ReportByDateRangeComponent } from './reports/report-by-date-range/report-by-date-range.component';
import { ReportByBillingCycleComponent } from './reports/report-by-billing-cycle/report-by-billing-cycle.component';
import { DateRangeSelectionComponent } from './reports/templ/date-range-selection/date-range-selection.component';
import { ReportListWithValidationComponent } from './reports/templ/report-list-with-validation/report-list-with-validation.component';
import { ReportListComponent } from './reports/templ/report-list/report-list.component';
// import { MdateComponent } from '../residents/templ-edit/mdate/mdate.component';
import { MdateModule } from '../residents/templ-edit/mdate/mdateModule';
import { ReportValidatedUnvalidatedComponent } from './reports/templ/report-validated-unvalidated/report-validated-unvalidated.component';
import { ReportListOccupFeeComponent } from './reports/templ/report-list-occup-fee/report-list-occup-fee.component';

// import { SplitPipe } from '../common/split.pipe';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    BillingDateSelectionComponent,
    SummaryInfoComponent,
    ScheduleEditComponent,
    ScheduleListComponent,
    ModalSetExitComponent,
    ReportByDateRangeComponent,
    ReportByBillingCycleComponent,
    DateRangeSelectionComponent,
    ReportListWithValidationComponent,
    ReportListComponent,
    ReportValidatedUnvalidatedComponent,
    ReportListOccupFeeComponent,
    // MdateComponent,
    // SplitPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    MdateModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AdminModule { }