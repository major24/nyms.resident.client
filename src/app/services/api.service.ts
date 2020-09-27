import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User, CareHomeUser } from '../models/index';
import { EnquiryResident, CareHome, Resident } from '../residents/models/index';
import { Invoice, Schedule } from '../admin/models/index';
import { ResidentSchedule } from '../admin/models/index';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

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
    return this.http.put<EnquiryResident>(
      `/api/enquires/${enqResident.referenceId}`,
      enqResident
    );
  }


  // === endof enquires ===



  // === resident related ===
  getAllResidents(careHomeId: number): Observable<Resident[]> {
    return this.http.get<Resident[]>(`/api/carehomes/${careHomeId}/residents/active`);
  }

  updateExitDate(referenceId: string, exitDate: string): Observable<any> {
    return this.http.put<any>(`/api/residents/${referenceId}/exit-date`, {referenceId: referenceId, exitDate: exitDate });
  }
  // === endof resident related ===




  // === care home lookup values ===
  loadAllCareHomeDetails(): Observable<CareHome[]> {
    return this.http.get<CareHome[]>(`/api/carehomes/details`);
  }


  // === endof carehome lookup values ===


  // === invoice reports ===
  loadInvoiceByDate(startDate: string, endDate: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`/api/invoices/all/${startDate}/${endDate}`);
  }


  downloadFile(billingStart: string, billingEnd: string): Observable<any> {
    const url = `/api/invoices/all/${billingStart}/${billingEnd}/download`;
    return this.http.get(url, { responseType: 'blob'} );
  }


  // === schedules ===
  loadSchedules(): Observable<ResidentSchedule[]> {
    return this.http.get<ResidentSchedule[]>(`/api/residents/schedules`);
  }

  loadSchedulesByReferenceId(referenceId: string): Observable<ResidentSchedule> {
    return this.http.get<ResidentSchedule>(`/api/residents/${referenceId}/schedules`);
  }

  updateScheduleEndDate(id: number, scheduleEndDate: string): Observable<any> {
    return this.http.put<any>(`/api/residents/schedules/${id}/end-date`, {id: id, scheduleEndDate: scheduleEndDate })
  }

  createSchedule(referenceId: string, schedule: Schedule): Observable<any> {
    return this.http.post<any>(`/api/residents/${referenceId}/schedules`, schedule);
  }


}
