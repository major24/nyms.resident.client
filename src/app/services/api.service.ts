import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User, CareHomeUser } from '../models/index';
import { EnquiryResident, CareHome, Resident, EnquiryAction } from '../residents/models/index';
import { InvoiceData, InvoiceResident, InvoiceCommentsRequest, BillingCycle, InvoiceValidatedRequest } from '../admin/models/index';
import { ResidentSchedule, Schedule } from '../admin/models/index';

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
    // return this.http.get<CareHomeUser>(
    //   `${environment.apiDomainUrl}/api/users/carehomeusers/${referenceId}`,
    //   { withCredentials: true }
    // );
  }
  //=== endof user related ===

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
    return this.http.get<Resident[]>(`/api/carehomes/${careHomeId}/residents/active`);
  }

  loadResidentByReferenceId(referenceId: string): Observable<Resident> {
    return this.http.get<Resident>(`/api/residents/${referenceId}`);
  }

  updateExitDate(referenceId: string, exitDate: string): Observable<any> {
    return this.http.post<any>(`/api/residents/${referenceId}/exit-date`, { referenceId: referenceId, exitDate: exitDate });
  }
  // === endof resident related ===




  // === care home lookup values ===
  loadAllCareHomeDetails(): Observable<CareHome[]> {
    return this.http.get<CareHome[]>(`/api/carehomes/details`);
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
    return this.http.get<InvoiceData>(`/api/invoices/all/${startDate}/${endDate}`);
  }

  loadInvoiceByBillingCycle(localAuthorityId: number, billingCycleId: number): Observable<InvoiceData> {
    return this.http.get<InvoiceData>(`/api/invoices/localAuthorities/${localAuthorityId}/billingCycles/${billingCycleId}`);
  }

  downloadFile(billingStart: string, billingEnd: string): Observable<any> {
    const url = `/api/invoices/all/${billingStart}/${billingEnd}/download`;
    return this.http.get(url, { responseType: 'blob' });
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


}
