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
import { MdateModule } from '../residents/templ-edit/mdate/mdateModule';
import { ReportValidatedUnvalidatedComponent } from './reports/templ/report-validated-unvalidated/report-validated-unvalidated.component';
import { ReportOccupancyByDayComponent } from './reports/templ/report-occupancy-by-day/report-occupancy-by-day.component';
import { ChartsModule } from 'ng2-charts';
import { CategoriesListComponent } from './spends/categories/categories-list/categories-list.component';
import { BudgetsListComponent } from './spends/budgets/budgets-list/budgets-list.component';
import { BudgetsEditComponent } from './spends/budgets/budgets-edit/budgets-edit.component';
import { BudgetEditDialogComponent } from './templates/budget-edit-dialog/budget-edit-dialog.component';
import { ReportSpendAdjustmentsComponent } from './reports/templ/report-spend-adjustments/report-spend-adjustments.component';
import { EnumKeyValueAdminPipe } from './enum-keyvalueAdmin.pipe';
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
    ReportOccupancyByDayComponent,
    CategoriesListComponent,
    BudgetsListComponent,
    BudgetsEditComponent,
    BudgetEditDialogComponent,
    ReportSpendAdjustmentsComponent,
    EnumKeyValueAdminPipe,
    // SplitPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    MdateModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ],
  providers: []
})
export class AdminModule { }