import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CareHomeUser, Role, SpendRequest, TransferSpendRequest } from '../models/index';
import { EnquiryResident, CareHome, CareHome0, Resident, EnquiryAction } from '../residents/models/index';
import { Budget, BudgetListResponse, SpendComments } from '../models/spend-budgets';
import { MeetingCategory, MeetingActionItem, Meeting, MeetingActionRequest, MeetingActionPendingJobsResponse, MeetingActionCompletedResponse } from '../../app/models/index';

import {
  ResidentSchedule,
  Schedule,
  InvoiceData,
  InvoiceCommentsRequest,
  BillingCycle,
  InvoiceValidatedRequest,
  InvoiceValidationsReportResponse,
  OccupancyByDate,
  SpendMasterCategory,
  SpendCategory
} from '../admin/models/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  // === User related ===
  authenticateUser(username: string, password: string): Observable<User> {
    return this.http.post<any>(
      `/api/authentication/authenticate`,
      { username, password },
      { withCredentials: true }
    );
  }

  getCareHomeUserByReferenceId(referenceId: string): Observable<CareHomeUser> {
    return this.http.get<CareHomeUser>(
      `/api/users/carehomeusers/${referenceId}`,
      { withCredentials: true }
    );
  }
  //=== endof user related ===

  // === Security Role related ===
  loadUsersByRoleId(roleId: number): Observable<CareHomeUser[]> {
    return this.http.get<CareHomeUser[]>(`/api/security/users/roles/${roleId}`,
      { withCredentials: true }
    );
  }

  hasAccessToRole(roleId: number): Observable<boolean> {
    return this.http.get<boolean>(`/api/security/users/roles/${roleId}/hasaccess`,
      { withCredentials: true }
    );
  }


  // === enquires related ===
  // All records for ADMIN, SUPER
  // Manager: only permitted - [0, 1, n] 0 = ALL
  getEnquiresByHomeId(careHomeId: number): Observable<EnquiryResident[]> {
    return this.http.get<EnquiryResident[]>(
      `/api/carehomes/${careHomeId}/enquires`
    );
  }

  getEnquiryByReferenceId(referenceId: string): Observable<EnquiryResident> {
    return this.http.get<EnquiryResident>(
      `/api/enquires/${referenceId}`
    );
  }

  createEnquiryResident(careHomeId: number, enqResident: EnquiryResident) {
    return this.http.post<any>(
      `/api/carehomes/${careHomeId}/enquires`, enqResident
    );
  }

  updateEnquiryResident(enqResident: EnquiryResident) {
    return this.http.post<EnquiryResident>(
      `/api/enquires/${enqResident.referenceId}`,
      enqResident
    );
  }

  admitResident(referenceId: string, resident: Resident): Observable<Resident> {
    return this.http.post<Resident>(`api/enquires/${referenceId}/admit`, resident);
  }

  //enquiry actions
  loadEnquiryActions(referenceId: string): Observable<EnquiryAction[]> {
    return this.http.get<EnquiryAction[]>(`/api/enquires/${referenceId}/actions`);
  }

  saveEnquiryActions(referenceId: string, enquiryActions: EnquiryAction[]): Observable<EnquiryAction[]> {
    return this.http.post<any>(`/api/enquires/${referenceId}/actions`, enquiryActions);
  }
  // === endof enquires ===



  // === resident related ===
  getAllResidents(careHomeId: number): Observable<Resident[]> {
    return this.http.get<Resident[]>(`/api/residents?q=all`);
  }

  getActiveResidents(careHomeId: number): Observable<Resident[]> {
    return this.http.get<Resident[]>(`/api/residents?q=active`);
  }

  loadResidentByReferenceId(referenceId: string): Observable<Resident> {
    return this.http.get<Resident>(`/api/residents/${referenceId}`);
  }

  updateResident(referenceId: string, resident: Resident): Observable<Resident> {
    return this.http.post<any>(`/api/residents/${referenceId}`, resident);
  }

  dischargeResident(referenceId: string, dischargeDate: string): Observable<any> {
    return this.http.post<any>(`/api/residents/${referenceId}/discharge`, { referenceId: referenceId, dischargedFromHomeDate: dischargeDate });
  }

  exitResidentSchedule(referenceId: string, exitDate: string): Observable<any> {
    return this.http.post<any>(`/api/residents/${referenceId}/exitschedule`, { referenceId: referenceId, exitDate: exitDate });
  }

  activateResident(referenceId: string): Observable<any> {
    return this.http.post<any>(`/api/residents/${referenceId}/activate`, { referenceId: referenceId });
  }
  // === endof resident related ===




  // === care home lookup values ===
  loadAllCareHomeDetails(): Observable<CareHome[]> {
    return this.http.get<CareHome[]>(`/api/carehomes/details`);
  }
  loadCareHomes(): Observable<CareHome0[]> {
    return this.http.get<CareHome0[]>(`/api/carehomes`);
  }
  loadCareHomeDetailByEnquiryReferenceId(referenceId: string): Observable<CareHome> {
    return this.http.get<CareHome>(`/api/enquires/${referenceId}/carehome/details`);
  }
  loadCareHomeDetailByResidentReferenceId(referenceId: string): Observable<CareHome> {
    return this.http.get<CareHome>(`/api/residents/${referenceId}/carehome/details`);
  }
  // === endof carehome lookup values ===


  // === invoice reports ===
  loadInvoiceByDate(startDate: string, endDate: string): Observable<InvoiceData> {
    return this.http.get<InvoiceData>(`/api/reports/invoices/summary/${startDate}/${endDate}`);
  }

  loadValidationsDataByDate(startDate: string, endDate: string): Observable<InvoiceValidationsReportResponse[]> {
    return this.http.get<InvoiceValidationsReportResponse[]>(`api/reports/invoices/validations/${startDate}/${endDate}`);
  }

  loadInvoiceByBillingCycle(localAuthorityId: number, billingCycleId: number): Observable<InvoiceData> {
    return this.http.get<InvoiceData>(`/api/invoices/localAuthorities/${localAuthorityId}/billingCycles/${billingCycleId}`);
  }

  downloadFile(billingStart: string, billingEnd: string): Observable<any> {
    //api/invoices/all/{billingBeginDate}/{billingEndDate}/download
    const url = `/api/invoices/all/${billingStart}/${billingEnd}/download`;
    return this.http.get(url, { responseType: 'blob' });
  }

  loadOccupancyByDate(startDate: string, endDate: string): Observable<OccupancyByDate[]> {
    return this.http.get<OccupancyByDate[]>(`api/reports/occupancy/${startDate}/${endDate}`);
  }



  updateInvoicePaymentsWithValidation(invoiceValidatedRequests: InvoiceValidatedRequest[]): Observable<any> {
    return this.http.post<any>(`/api/invoices/validations`, invoiceValidatedRequests);
  }

  insertInvoiceComment(invoiceCommentRequest: InvoiceCommentsRequest): Observable<any> {
    return this.http.post<any>(`/api/invoices/comments`, invoiceCommentRequest);
  }

  // === schedules ===
  loadSchedules(): Observable<ResidentSchedule[]> {
    return this.http.get<ResidentSchedule[]>(`/api/residents/schedules`);
  }

  loadSchedulesByReferenceId(referenceId: string): Observable<ResidentSchedule> {
    return this.http.get<ResidentSchedule>(`/api/residents/${referenceId}/schedules`);
  }

  updateScheduleEndDate(id: number, scheduleEndDate: string): Observable<any> {
    return this.http.post<any>(`/api/residents/schedules/${id}/end-date`, { id: id, scheduleEndDate: scheduleEndDate })
  }

  inactivateSchedule(id: number): Observable<any> {
    return this.http.post<any>(`/api/residents/schedules/${id}/inactivate`, { id: id })
  }


  // todo: whild refactor
  createSchedule(referenceId: string, schedule: Schedule): Observable<any> {
    return this.http.post<any>(`/api/residents/${referenceId}/schedules`, schedule);
  }

  loadPaymentProviders(): Observable<any> {
    return this.http.get<any>(`/api/schedules/payment-providers`);
  }

  loadPaymentTypes(): Observable<any> {
    return this.http.get<any>(`/api/schedules/payment-types`);
  }

  // === billing cycles ===
  loadBillingCycles(): Observable<BillingCycle[]> {
    return this.http.get<BillingCycle[]>(`/api/invoices/billing-cycles`);
  }




  // === Spends and Budgets ===
  loadMasterCategories(): Observable<SpendMasterCategory[]> {
    return this.http.get<SpendMasterCategory[]>(`/api/spends/mastercategories`);
  }

  loadCategories(): Observable<SpendCategory[]> {
    return this.http.get<SpendCategory[]>(`/api/spends/categories`);
  }

  createCategory(spendCategory: SpendCategory): Observable<SpendCategory> {
    return this.http.post<SpendCategory>(`/api/spends/categories`, spendCategory);
  }

  updateCategory(id: number, spendCategory: SpendCategory): Observable<SpendCategory> {
    return this.http.post<SpendCategory>(`/api/spends/categories/${id}`, spendCategory);
  }

  loadBudgetsForAdmin(startDate: string, endDate: string): Observable<BudgetListResponse[]> {
    return this.http.get<BudgetListResponse[]>(`/api/admin/budgets/${startDate}/${endDate}`);
  }

  loadBudgetsForUser(startDate: string, endDate: string): Observable<BudgetListResponse[]> {
    return this.http.get<BudgetListResponse[]>(`/api/user/budgets/${startDate}/${endDate}`);
  }

  loadBudgetsForUserByMonth(month: number, year: number): Observable<BudgetListResponse[]> {
    return this.http.get<BudgetListResponse[]>(`/api/user/budgets/${month}/${year}`);
  }

  loadBudgetNamesForUser(budgetType: string): Observable<Budget[]> {
    return this.http.get<Budget[]>(`/api/user/budgetnames/${budgetType}`);
  }

  loadBudgetsForSummryReport(startDate: string, endDate: string): Observable<BudgetListResponse[]> {
    return this.http.get<BudgetListResponse[]>(`/api/admin/budgets/${startDate}/${endDate}/spends`);
  }

  // returns for user and admin
  loadBudgetByReferenceId(referenceId: string): Observable<Budget> {
    return this.http.get<Budget>(`/api/user/budgets/${referenceId}`);
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`/api/admin/budgets`, budget);
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`/api/admin/budgets/${budget.referenceId}`, budget);
  }

  saveNewAmount(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`/api/admin/budgets/${budget.referenceId}/allocations`, budget);
  }

  createSpend(spendRequest: SpendRequest): Observable<SpendRequest> {
    return this.http.post<SpendRequest>(`/api/user/spends`, spendRequest);
  }

  createSpendComment(spendComment: SpendComments): Observable<SpendComments> {
    return this.http.post<SpendComments>(`/api/user/spends/comments`, spendComment);
  }

  issueCreditNote(spendRequest: SpendRequest): Observable<SpendRequest> {
    return this.http.post<SpendRequest>(`/api/admin/spends/creditnote`, spendRequest);
  }

  transferSpend(transferSpendRequest: TransferSpendRequest): Observable<boolean> {
    return this.http.post<boolean>(`/api/admin/spends/tranferspend`, transferSpendRequest);
  }

  // === Roles ====
  loadRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`/api/security/roles`);
  }


  // Meeting categories and action items
  loadMeetingCategoriesAndActionItems(): Observable<MeetingCategory[]> {
    return this.http.get<MeetingCategory[]>(`/api/meetings/categories-and-actions-items`);
  }

  createMeetingCategory(meetingCategory: MeetingCategory): Observable<MeetingCategory> {
    return this.http.post<MeetingCategory>(`/api/meetings/categories-and-actions-items`, meetingCategory);
  }

  updateMeetingActionItem(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
    return this.http.post<MeetingActionItem>(`/api/meetings/categories/action-items/${meetingActionItem.id}`, meetingActionItem);
  }

  insertMeetingActionItem(meetingActionItem: MeetingActionItem): Observable<MeetingActionItem> {
    return this.http.post<MeetingActionItem>(`/api/meetings/categories/action-items`, meetingActionItem);
  }

  updateMeetingAction(meetingAction: MeetingActionRequest): Observable<MeetingActionRequest> {
    return this.http.post<MeetingActionRequest>(`/api/meetings/actions/${meetingAction.id}`, meetingAction);
  }

  loadMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`/api/meetings/meetings`);
  }

  loadMeeting(referenceId: string): Observable<Meeting> {
    return this.http.get<Meeting>(`/api/meetings/meetings/${referenceId}`);
  }

  createMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`/api/meetings/meetings`, meeting);
  }

  updateMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`/api/meetings/meetings/${meeting.referenceId}`, meeting);
  }

  // load all owners with their pending actions
  loadPendingActions(): Observable<MeetingActionPendingJobsResponse[]> {
    return this.http.get<MeetingActionPendingJobsResponse[]>(`api/meetings/actions/pending/owners`);
  }

  loadPendingActionsByOwnerId(userRefId: string): Observable<MeetingActionPendingJobsResponse[]> {
    return this.http.get<MeetingActionPendingJobsResponse[]>(`api/meetings/actions/pending/owners/${userRefId}`);
  }

  updateActionCompleted(selectedAction: any): Observable<any> {
    return this.http.post<Meeting>(`/api/meetings/actions/complete/${selectedAction.id}`, selectedAction);
  }

  loadCompletedActions(): Observable<MeetingActionCompletedResponse[]> {
    return this.http.get<MeetingActionCompletedResponse[]>(`api/meetings/actions/completed/unaudited`);
  }

  updateActionAudited(selectedAction: any): Observable<any> {
    return this.http.post<Meeting>(`/api/meetings/actions/audit/${selectedAction.id}`, selectedAction);
  }

}
